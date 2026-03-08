import { useRef, useEffect } from "react";
import { getAnalyser } from "../audio/audioEngine";
import { drawBars } from "../visualizers/barsVisualizer";
import { drawRadial } from "../visualizers/radialVisualizer";
import { drawWave } from "../visualizers/waveVisualizer";

function VisualizerContainer({ mode }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function setupCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    let peaks = [];
    let dataArray = null;

    function draw() {
      const analyser = getAnalyser();

      if (!analyser) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      if (!dataArray) {
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }

      analyser.getByteFrequencyData(dataArray);

      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      if (modeRef.current === "bars") {
        drawBars({ ctx, dataArray, width, height, peaks });
      }

      if (modeRef.current === "radial") {
        drawRadial({ ctx, dataArray, width, height, peaks });
      }

      if (modeRef.current === "wave") {
        drawWave({ ctx, analyser, width, height });
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", setupCanvas);
    };
  }, []); // 👈 SIN dependencia de mode

  return <canvas ref={canvasRef} />;
}

export default VisualizerContainer;
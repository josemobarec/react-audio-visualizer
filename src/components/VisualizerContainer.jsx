import { useRef, useEffect } from "react";
import { getAnalyser } from "../audio/audioEngine";

function VisualizerContainer() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    resize();
    window.addEventListener("resize", resize);

    let peaks = [];

    function draw() {
      const analyser = getAnalyser();

      if (!analyser) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const visibleBars = 64;
      const barWidth = canvas.width / (visibleBars * 2);
      const center = canvas.width / 2;

      for (let i = 0; i < visibleBars; i++) {
        const value = dataArray[i];
        const percent = value / 255;
        const targetHeight = canvas.height * percent;

        // 🔥 Peak memory
        if (!peaks[i]) peaks[i] = 0;

        if (targetHeight > peaks[i]) {
          peaks[i] = targetHeight;
        } else {
          peaks[i] *= 0.92; // velocidad de caída
        }

        const barHeight = peaks[i];

        const gradient = ctx.createLinearGradient(
          0,
          canvas.height - barHeight,
          0,
          canvas.height
        );

        gradient.addColorStop(0, "#ff4ecd");
        gradient.addColorStop(0.5, "#8a6cff");
        gradient.addColorStop(1, "#3a86ff");

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#8a6cff";

        ctx.fillRect(
          center + i * barWidth,
          canvas.height - barHeight,
          barWidth * 0.9,
          barHeight
        );

        ctx.fillRect(
          center - (i + 1) * barWidth,
          canvas.height - barHeight,
          barWidth * 0.9,
          barHeight
        );
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default VisualizerContainer;
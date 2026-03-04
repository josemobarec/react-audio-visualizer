import {
  getAudioContext,
  initializeAudio,
  playAudio,
  pauseAudio,
  isPlaying,
  setVolume
} from "../audio/audioEngine";

import { useState } from "react";

function ControlPanel({ mode, setMode }) {
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    const context = getAudioContext();

    if (context.state === "suspended") {
      context.resume();
    }

    if (isPlaying()) {
      pauseAudio();
      setPlaying(false);
    } else {
      playAudio();
      setPlaying(true);
    }
  }

  return (
    <>
      <h2>React Audio Visualizer</h2>

      <label>
        Select Visualizer
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="bars">Bars</option>
          <option value="radial">Radial</option>
          <option value="wave">Wave</option>
        </select>
      </label>

      <button onClick={handlePlay}>
        {playing ? "Pause" : "Play"}
      </button>

      <label>
        Volume
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="100"
          onChange={(e) => {
            const normalized = e.target.value / 100;
            setVolume(normalized);
          }}
        />
      </label>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];

          if (file) {
            initializeAudio(file);
            setPlaying(false);
            console.log("Audio file loaded:", file.name);
          }
        }}
      />
    </>
  );
}

export default ControlPanel;
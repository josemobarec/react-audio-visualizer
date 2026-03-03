import { getAudioContext } from "../audio/audioEngine";
import { initializeAudio } from "../audio/audioEngine";
import { playAudio } from "../audio/audioEngine";

function ControlPanel() {
  
  function handlePlay() {
  const context = getAudioContext();

  if (context.state === "suspended") {
    context.resume();
  }

  playAudio();
}

  return (
    <>
      <h2>React Audio Visualizer</h2>

      <label>
        Select Visualizer
        <select>
          <option value="bars">Bars</option>
          <option value="radial">Radial</option>
          <option value="wave">Wave</option>
        </select>
      </label>

      <button onClick={handlePlay}>Play / Pause</button>

      <label>
        Volume
        <input type="range" min="0" max="100" />
      </label>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];

          if (file) {
            initializeAudio(file);
            console.log("Audio file loaded:", file.name);
          }
        }}
/>
    </>
  );
}

export default ControlPanel;
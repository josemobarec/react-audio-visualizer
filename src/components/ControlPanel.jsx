function ControlPanel() {
  return (
    <>
      <h2>React Audio Visualizer</h2>

      <label>
        Select Visualizer
        <select>
          <option>Barras</option>
          <option>Radial</option>
          <option>Wave</option>
        </select>
      </label>

      <button>Play / Pause</button>

      <label>
        Volume
        <input type="range" min="0" max="100" />
      </label>

      <input type="file" accept="audio/*" />
    </>
  );
}

export default ControlPanel;
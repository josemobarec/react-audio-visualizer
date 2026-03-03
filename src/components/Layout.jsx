import "../styles/layout.css";
import VisualizerContainer from "./VisualizerContainer";
import ControlPanel from "./ControlPanel";

function Layout() {
  return (
    <div className="app-container">
      <div className="visualizer-area">
        <VisualizerContainer />
      </div>
      <div className="control-panel">
        <ControlPanel />
      </div>
    </div>
  );
}

export default Layout;
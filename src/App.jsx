import { useState } from "react";
import Layout from "./components/Layout";
import ControlPanel from "./components/ControlPanel";
import VisualizerContainer from "./components/VisualizerContainer";

function App() {
  const [mode, setMode] = useState("bars");

  return (
    <Layout>
      <VisualizerContainer mode={mode} />
      <ControlPanel mode={mode} setMode={setMode} />
    </Layout>
  );
}

export default App;
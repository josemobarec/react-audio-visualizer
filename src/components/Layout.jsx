import "../styles/layout.css";

function Layout({ children }) {
  return (
    <div className="app-container">
      <div className="visualizer-area">
        {children[0]}
      </div>
      <div className="control-panel">
        {children[1]}
      </div>
    </div>
  );
}

export default Layout;
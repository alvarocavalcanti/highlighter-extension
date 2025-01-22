import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";

const Popup = () => {
  return (
    <div className="popup">
      <h1>Highlighter Extension</h1>
      <div className="controls">
        <button>Highlight Selection</button>
      </div>
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);

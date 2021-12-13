import React from "react";
import "./App.css";
import "../node_modules/normalize.css/normalize.css";
import "../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css";
import "../node_modules/@blueprintjs/core/lib/css/blueprint.css";
import { Map } from "./components/map";
import { Settings } from "./components/settings";

function App() {
  return (
    <div className="app">
      <div className="map">
        <Map />
      </div>
      <div className="settings">
        <Settings />
      </div>
    </div>
  );
}

export default App;

import React from "react";
import { Switch, Route } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import HomePage from "./pages/HomePage";
import * as PATHS from "./utils/paths";

function App() {
  return (
    <div className="App">
      <ImageUpload />
    </div>
  );
}

export default App;

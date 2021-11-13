import React from "react";
import "./App.scss";
import RenderUserData from "./components/RenderUserData/RenderUserData";
import RenderSleepData from "./components/RenderSleepData/RenderSleepData";

function App() {
  return (
    <div className="App">
      <RenderUserData />

      <RenderSleepData />
    </div>
  );
}

export default App;

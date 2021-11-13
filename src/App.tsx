import { useState } from "react";
import "./App.scss";
import RenderUserData from "./components/RenderUserData/RenderUserData";
import RenderSleepData from "./components/RenderSleepData/RenderSleepData";

function App() {
  const [ouraUserData, setOuraUserData] = useState({});
  const [ouraSleepData, setOuraSleepData] = useState({});

  return (
    <div className="App">
      <RenderUserData
        ouraUserData={ouraUserData}
        setOuraUserData={setOuraUserData}
      />

      <RenderSleepData
        ouraSleepData={ouraSleepData}
        setOuraSleepData={setOuraSleepData}
      />
    </div>
  );
}

export default App;

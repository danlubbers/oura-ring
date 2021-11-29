import React, { useContext, useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import { GlobalContext } from "../context/Provider";

function Readiness() {
  const { readinessData } = useContext(GlobalContext);
  const [todaysData, setTodaysData] = useState({});

  useEffect(() => {
    const todaysDate =
      readinessData?.[readinessData.length - 1]?.summary_date.slice(5);
    const todaysData = readinessData?.[readinessData.length - 1];

    setTodaysData({ date: todaysDate, data: todaysData });
  }, [readinessData]);

  const score = todaysData?.data?.score;

  return (
    <div>
      <RenderReadinessData
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
        score={score}
      />
      <NavigationHeader />
    </div>
  );
}

export default Readiness;

import React, { useContext, useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import { GlobalContext } from "../context/Provider";

function Readiness() {
  const { readinessData, sleepData } = useContext(GlobalContext);
  const [todaysData, setTodaysData] = useState({});
  console.log(`todaysData`, todaysData);

  useEffect(() => {
    // SleepData is used because readinessData API does not have a bedtime date, only a summary date and that is for the previous day.
    const todaysDate = sleepData?.[sleepData.length - 1]?.bedtime_end.slice(
      5,
      10
    );
    const todaysData = readinessData?.[readinessData.length - 1];

    setTodaysData({ date: todaysDate, data: todaysData });
  }, [readinessData, sleepData]);

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

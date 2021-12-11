import React, { useContext, useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import { GlobalContext } from "../context/Provider";

function Readiness() {
  const { readinessData, sleepData } = useContext(GlobalContext);
  const [todaysData, setTodaysData] = useState({});
  console.log(`todaysData`, todaysData);

  const restingHR = todaysData?.data?.sleep?.hr_lowest;
  const avgHRV = todaysData?.data?.sleep?.rmssd;
  const bodyTemp = todaysData?.data?.sleep?.temperature_delta;
  const respiratoryRate = todaysData?.data?.sleep?.breath_average.toFixed(1);

  useEffect(() => {
    const todaysDate = sleepData?.[sleepData.length - 1]?.bedtime_end.slice(
      5,
      10
    );
    const todaysData = {
      readiness: readinessData?.[readinessData.length - 1],
      sleep: sleepData?.[sleepData.length - 1],
    };

    setTodaysData({ date: todaysDate, data: todaysData });
  }, [readinessData, sleepData]);

  const score = todaysData?.data?.readiness?.score;

  return (
    <div>
      <RenderReadinessData
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
        score={score}
        restingHR={restingHR}
        avgHRV={avgHRV}
        bodyTemp={bodyTemp}
        respiratoryRate={respiratoryRate}
      />
      <NavigationHeader />
    </div>
  );
}

export default Readiness;

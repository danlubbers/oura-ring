import React, { useContext, useState, useEffect } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";

function Readiness() {
  const { readinessData, sleepData } = useContext(GlobalContext);
  const [todaysData, setTodaysData] = useState({});
  // console.log(`todaysData`, todaysData);

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

  // Quad Data
  const restingHR = todaysData?.data?.sleep?.hr_lowest;
  const avgHRV = todaysData?.data?.sleep?.rmssd;
  const bodyTempData = todaysData?.data?.sleep?.temperature_delta;
  const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
  const bodyTempFahrenheit = (conversionToFahrenheit - 32).toFixed(1);
  const respiratoryRate = todaysData?.data?.sleep?.breath_average.toFixed(1);

  // Overall Score
  const score = todaysData?.data?.readiness?.score;

  // Contributors
  const restingHRScore = todaysData?.data?.readiness?.score_resting_hr;
  const HRVScore = todaysData?.data?.readiness?.score_hrv_balance;
  const bodyTempScore = todaysData?.data?.readiness?.score_temperature;
  const recoveryScore = todaysData?.data?.readiness?.score_recovery_index;
  const sleepScore = todaysData?.data?.readiness?.score_previous_night;
  const sleepBalanceScore = todaysData?.data?.readiness?.score_sleep_balance;
  const previousDayActivityScore =
    todaysData?.data?.readiness?.score_previous_day;
  const activityBalanceScore =
    todaysData?.data?.readiness?.score_activity_balance;

  const readinessContributorData = [
    { name: "Resting heart rate", score: restingHRScore },
    { name: "HRV balance", score: HRVScore },
    { name: "Body Temperature", score: bodyTempScore },
    { name: "Recovery index", score: recoveryScore },
    { name: "Sleep", score: sleepScore },
    { name: "Sleep balance", score: sleepBalanceScore },
    { name: "Previous Day Activity", score: previousDayActivityScore },
    { name: "Activity balance", score: activityBalanceScore },
  ];

  return (
    <div>
      <DateRenderer
        readiness
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
      />
      <RenderReadinessData
        todaysDate={todaysData.date}
        score={score}
        restingHR={restingHR}
        avgHRV={avgHRV}
        bodyTemp={bodyTempFahrenheit}
        respiratoryRate={respiratoryRate}
        readinessContributorData={readinessContributorData}
      />
      <NavigationHeader />
    </div>
  );
}

export default Readiness;

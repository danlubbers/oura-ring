import React, { useContext, useState, useEffect } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import moment from "moment";
import { timeIncrement } from "../utilities/incrementTime";

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

  const sleepDuration = todaysData?.data?.sleep?.duration;

  // Quad Data
  const restingHR = todaysData?.data?.sleep?.hr_lowest;
  const bodyTempData = todaysData?.data?.sleep?.temperature_delta;
  const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
  const bodyTempFahrenheit = (conversionToFahrenheit - 32).toFixed(1);
  const respiratoryRate = todaysData?.data?.sleep?.breath_average.toFixed(1);

  // Quad and Chart Data
  const avgHRV = todaysData?.data?.sleep?.rmssd;
  const maxHRV =
    todaysData?.data?.sleep && Math.max(...todaysData?.data?.sleep?.rmssd_5min);

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

  // Chart Data
  const timeStart = new Date(todaysData?.data?.sleep?.bedtime_start);
  const bedtimeStart = moment(timeStart).format("HH:mm");
  const timeEnd = new Date(todaysData?.data?.sleep?.bedtime_end);
  const bedtimeEnd = moment(timeEnd).format("HH:mm");
  const minHeartRate = todaysData?.data?.sleep?.hr_lowest;
  const maxHeartRate =
    todaysData?.data?.sleep && Math.max(...todaysData?.data?.sleep?.hr_5min);

  const heartRateData = todaysData?.data?.sleep?.hr_5min
    ?.map((heartRate, idx) => {
      const time = timeIncrement(bedtimeStart, sleepDuration)[idx];

      return {
        heartRate: heartRate,
        timeDuration: time,
      };
    })
    .filter((obj) => obj.heartRate !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const hrvData = todaysData?.data?.sleep?.rmssd_5min
    ?.map((hrv, idx) => {
      const time = timeIncrement(bedtimeStart, sleepDuration)[idx];

      return {
        HRV: hrv,
        timeDuration: time,
      };
    })
    .filter((obj) => obj.HRV !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const avgHRData = todaysData?.data?.sleep?.hr_5min.reduce(
    (avg, value, _, { length }) => {
      return avg + value / length;
    },
    0
  );

  return (
    <div>
      <DateRenderer
        readiness
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
      />
      <RenderReadinessData
        score={score}
        todaysDate={todaysData.date}
        bodyTemp={bodyTempFahrenheit}
        respiratoryRate={respiratoryRate}
        bedtimeStart={bedtimeStart}
        bedtimeEnd={bedtimeEnd}
        avgHRData={avgHRData}
        restingHR={restingHR}
        minHeartRate={minHeartRate}
        maxHeartRate={maxHeartRate}
        avgHRV={avgHRV}
        maxHRV={maxHRV}
        heartRateData={heartRateData}
        hrvData={hrvData}
        readinessContributorData={readinessContributorData}
      />
      <NavigationFooter />
    </div>
  );
}

export default Readiness;

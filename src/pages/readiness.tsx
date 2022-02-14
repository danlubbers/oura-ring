import React, { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { timeIncrement } from "../utilities/incrementTime";

function Readiness() {
  const {
    todaysData: { date, bedtimeStart, data },
  } = useContext(GlobalContext);
  // console.log(`Readiness: todaysData`, todaysData);

  // Time Data
  const sleepDuration = data?.sleep?.duration;
  const bedtimeStartHourAndMin = bedtimeStart && bedtimeStart.slice(11, 16);
  // const bedtimeEndHourAndMin = bedtimeEnd && bedtimeEnd.slice(11, 16);

  // Quad Data
  const restingHR = data?.sleep?.hr_lowest;
  const bodyTempData = data?.sleep?.temperature_delta;
  const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
  const bodyTempFahrenheit = parseInt((conversionToFahrenheit - 32).toFixed(1));
  const respiratoryRate = parseInt(data?.sleep?.breath_average.toFixed(1));

  // Quad and Chart Data
  const avgHRV = data?.sleep?.rmssd;
  const maxHRV = data?.sleep && Math.max(...data?.sleep?.rmssd_5min);

  // Overall Score
  const score = data?.readiness?.score;

  // Contributors
  const restingHRScore = data?.readiness?.score_resting_hr;
  const HRVScore = data?.readiness?.score_hrv_balance;
  const bodyTempScore = data?.readiness?.score_temperature;
  const recoveryScore = data?.readiness?.score_recovery_index;
  const sleepScore = data?.readiness?.score_previous_night;
  const sleepBalanceScore = data?.readiness?.score_sleep_balance;
  const previousDayActivityScore = data?.readiness?.score_previous_day;
  const activityBalanceScore = data?.readiness?.score_activity_balance;

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

  const minHeartRate = data?.sleep?.hr_lowest;
  const maxHeartRate = data?.sleep && Math.max(...data?.sleep?.hr_5min);

  const heartRateData = data?.sleep?.hr_5min
    ?.map((heartRate, idx) => {
      const time = timeIncrement(bedtimeStartHourAndMin, sleepDuration)[idx];

      return {
        heartRate: heartRate,
        timeDuration: parseInt(time),
      };
    })
    .filter((obj) => obj.heartRate !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const hrvData = data?.sleep?.rmssd_5min
    ?.map((hrv, idx) => {
      const time = timeIncrement(bedtimeStartHourAndMin, sleepDuration)[idx];

      return {
        HRV: hrv,
        timeDuration: parseInt(time),
      };
    })
    .filter((obj) => obj.HRV !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const avgHRData = data?.sleep?.hr_5min.reduce((avg, value, _, { length }) => {
    return avg + value / length;
  }, 0);

  return (
    <div>
      <DateRenderer />
      <RenderReadinessData
        score={score}
        todaysDate={date}
        bodyTemp={bodyTempFahrenheit}
        respiratoryRate={respiratoryRate}
        // bedtimeStart={bedtimeStartHourAndMin}
        // bedtimeEnd={bedtimeEndHourAndMin}
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

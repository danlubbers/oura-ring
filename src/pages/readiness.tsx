import React, { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { timeIncrement } from "../utilities/incrementTime";
import { getAverages } from "../utilities/getAverages";

function Readiness() {
  const {
    todaysData: { date, bedtimeStart, data },
  } = useContext(GlobalContext);
  console.log(`Readiness: todaysData`, data);

  // Time Data
  const sleepDuration = data?.sleepPeriod?.total_sleep_duration;
  const bedtimeStartHourAndMin = bedtimeStart && bedtimeStart.slice(11, 16);
  // const bedtimeEndHourAndMin = bedtimeEnd && bedtimeEnd.slice(11, 16);

  // Quad Data
  const restingHR = data?.sleepPeriod?.average_heart_rate;
  const bodyTempData = data?.readiness?.temperature_deviation;
  const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
  const bodyTempFahrenheit = parseFloat(
    (conversionToFahrenheit - 32).toFixed(1)
  );
  const respiratoryRate = parseFloat(
    data?.sleepPeriod?.average_breath.toFixed(1)
  );

  // Quad and Chart Data
  const avgHRV = data?.sleepPeriod?.average_hrv;
  const maxHRV =
    data?.sleepPeriod && Math.max(...data?.sleepPeriod?.hrv?.items);

  // Overall Score
  const score = data?.readiness?.score;

  // Contributors
  const restingHRScore = data?.readiness?.contributors?.resting_heart_rate;
  const HRVScore = data?.readiness?.contributors?.hrv_balance;
  const bodyTempScore = data?.readiness?.temperature_deviation;
  const recoveryScore = data?.readiness?.contributors?.recovery_index;
  const sleepScore = data?.readiness?.contributors?.previous_night;
  const sleepBalanceScore = data?.readiness?.contributors?.sleep_balance;
  const previousDayActivityScore =
    data?.readiness?.contributors?.previous_day_activity;
  const activityBalanceScore = data?.readiness?.contributors?.activity_balance;

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

  const minHeartRate = data?.sleepPeriod?.lowest_heart_rate;
  const maxHeartRate =
    data?.sleepPeriod && Math.max(...data?.sleepPeriod?.heart_rate?.items);

  const heartRateData = data?.sleepPeriod?.heart_rate?.items
    ?.map((heartRate, idx) => {
      const time = timeIncrement(bedtimeStartHourAndMin, sleepDuration)[idx];

      return {
        heartRate: heartRate,
        timeDuration: parseInt(time),
      };
    })
    .filter((obj) => obj.heartRate !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const hrvData = data?.sleepPeriod?.hrv?.items
    ?.map((hrv, idx) => {
      const time = timeIncrement(bedtimeStartHourAndMin, sleepDuration)[idx];

      return {
        HRV: hrv,
        timeDuration: parseInt(time),
      };
    })
    .filter((obj) => obj.HRV !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const avgHRData = getAverages(data?.sleepPeriod?.heart_rate?.items);

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

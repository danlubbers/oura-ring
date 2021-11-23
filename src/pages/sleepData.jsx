import React, { useContext } from "react";
import NavigationHeader from "../components/NavigationHeader/NavigationHeader";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import { GlobalContext } from "../context/Provider";

function SleepData() {
  const { ouraData } = useContext(GlobalContext);
  const sleepData = ouraData?.ouraSleepData?.data.sleep;

  const prevNightsData = sleepData?.[sleepData?.length - 1];
  const summaryDate = prevNightsData?.summary_date;

  const bedtimeStart = new Date(
    prevNightsData?.bedtime_start
  ).toLocaleTimeString();
  const bedtimeEnd = new Date(prevNightsData?.bedtime_end).toLocaleTimeString();
  const lowestHR = prevNightsData?.hr_lowest;

  const filterOutZeros = prevNightsData?.hr_5min.filter((num) => num !== 0);
  const minHeartRate = filterOutZeros && Math.min(...filterOutZeros);
  const maxHeartRate = prevNightsData && Math.max(...prevNightsData?.hr_5min);
  // console.log(`minHeartRate`, minHeartRate);
  // console.log(`maxHeartRate`, maxHeartRate);
  const avgHRData = prevNightsData?.hr_5min.reduce(
    (avg, value, _, { length }) => {
      return avg + value / length;
    },
    0
  );

  const heartRateDataObj = filterOutZeros?.map((heartRate, idx) => {
    return {
      heartRate: heartRate,
      timeDuration: idx,
    };
  });

  const hrvData = prevNightsData?.rmssd_5min.map((hrv, idx) => {
    return {
      HRV: hrv,
      timeDuration: idx,
    };
  });

  return (
    <div>
      <NavigationHeader />
      <RenderSleepData
        bedtimeStart={bedtimeStart}
        bedtimeEnd={bedtimeEnd}
        summaryDate={summaryDate}
        lowestHR={lowestHR}
        avgHRData={avgHRData}
        data={prevNightsData}
        width={"width"}
        height={"height"}
        filterOutZeros={filterOutZeros}
        minHeartRate={minHeartRate}
        maxHeartRate={maxHeartRate}
        heartRateDataObj={heartRateDataObj}
        hrvData={hrvData}
      />
    </div>
  );
}

export default SleepData;

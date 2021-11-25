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

  const filterOutZeros = prevNightsData?.hr_5min.filter((num) => num !== 0);
  const minHeartRate = prevNightsData?.hr_lowest;
  const maxHeartRate = prevNightsData && Math.max(...prevNightsData?.hr_5min);
  const maxHRV = prevNightsData && Math.max(...prevNightsData?.rmssd_5min);

  // console.log(`minHeartRate`, minHeartRate);
  // console.log(`maxHeartRate`, maxHeartRate);
  // console.log(`maxHRV`, maxHRV);

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
        avgHRData={avgHRData}
        data={prevNightsData}
        width={"width"}
        height={"height"}
        filterOutZeros={filterOutZeros}
        minHeartRate={minHeartRate}
        maxHeartRate={maxHeartRate}
        maxHRV={maxHRV}
        heartRateDataObj={heartRateDataObj}
        hrvData={hrvData}
      />
    </div>
  );
}

export default SleepData;

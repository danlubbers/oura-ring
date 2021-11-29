import React, { useContext, useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import { GlobalContext } from "../context/Provider";

function SleepData() {
  const { sleepData } = useContext(GlobalContext);

  const [todaysData, setTodaysData] = useState({});

  useEffect(() => {
    const todaysDate = sleepData?.[sleepData.length - 1]?.summary_date.slice(5);
    const todaysData = sleepData?.[sleepData.length - 1];

    setTodaysData({ date: todaysDate, data: todaysData });
  }, [sleepData]);

  const bedtimeStart = new Date(
    todaysData?.data?.bedtime_start
  ).toLocaleTimeString();

  const bedtimeEnd = new Date(
    todaysData?.data?.bedtime_end
  ).toLocaleTimeString();

  const filterOutZeros = todaysData?.data?.hr_5min.filter((num) => num !== 0);
  const minHeartRate = todaysData?.data?.hr_lowest;
  const maxHeartRate =
    todaysData?.data && Math.max(...todaysData?.data?.hr_5min);
  const avgHRV = todaysData?.data?.rmssd;

  const maxHRV = todaysData?.data && Math.max(...todaysData?.data?.rmssd_5min);

  const avgHRData = todaysData?.data?.hr_5min.reduce(
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

  const hrvData = todaysData?.data?.rmssd_5min.map((hrv, idx) => {
    return {
      HRV: hrv,
      timeDuration: idx,
    };
  });

  return (
    <div>
      <RenderSleepData
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
        bedtimeStart={bedtimeStart}
        bedtimeEnd={bedtimeEnd}
        avgHRData={avgHRData}
        data={todaysData.data}
        width={"width"}
        height={"height"}
        filterOutZeros={filterOutZeros}
        minHeartRate={minHeartRate}
        maxHeartRate={maxHeartRate}
        avgHRV={avgHRV}
        maxHRV={maxHRV}
        heartRateDataObj={heartRateDataObj}
        hrvData={hrvData}
      />
      <NavigationHeader />
    </div>
  );
}

export default SleepData;

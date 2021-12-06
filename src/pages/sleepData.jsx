import React, { useContext, useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import { GlobalContext } from "../context/Provider";
import moment from "moment";
function SleepData() {
  const { sleepData } = useContext(GlobalContext);

  const [todaysData, setTodaysData] = useState({});
  console.log(`todaysData`, todaysData);

  useEffect(() => {
    const todaysDate = sleepData?.[sleepData.length - 1]?.bedtime_end.slice(
      5,
      10
    );
    const todaysData = sleepData?.[sleepData.length - 1];

    setTodaysData({ date: todaysDate, data: todaysData });
  }, [sleepData]);

  const bedtimeStart = new Date(todaysData?.data?.bedtime_start);
  // console.log(`bedtimeStart`, bedtimeStart?.getMinutes());
  const timeStart = moment(bedtimeStart).format("HH:mm");
  const sleepDuration = todaysData?.data?.duration;

  const bedtimeEnd = new Date(todaysData?.data?.bedtime_end);
  const timeEnd = moment(bedtimeEnd).format("HH:mm");

  // const filterOutZeros = todaysData?.data?.hr_5min.filter((num) => num !== 0);
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

  const timeIncrement = (startTime, sleepDuration) => {
    let count = [startTime];
    let increment = 5; // increase 5min
    const endTime = Math.ceil(sleepDuration / 60 / 5); // seconds to minutes to five minute duration
    let times = startTime.split(":");
    let hour = parseInt(times[0]);
    let minute = parseInt(times[1]);

    for (let i = 0; i <= endTime + 30; i++) {
      minute = Math.floor(minute / 5) * 5;
      minute += increment;

      if (hour >= 24) {
        // Resets to military time to 0 after midnight
        hour = 0;
      }
      if (hour > 10 && minute < 10) {
        count.push(`${hour}:0${minute}`);
      }
      if (hour > 10 && minute >= 10 && minute < 60) {
        // Fixes issue with 22:60 and 22:65
        count.push(`${hour}:${minute}`);
      }
      // These work after midnight
      if (minute > 60) {
        count.push(`${++hour}:0${(minute = 0)}`);
      }
      if (hour > 10 && minute > 60) {
        count.push(`${++hour}:0${(minute = 0)}`);
      }
      if (hour < 10 && minute > 60) {
        count.push(`0${++hour}:0${(minute = 0)}`);
      }
      if (hour < 10 && minute < 10 && minute !== 0) {
        count.push(`0${hour}:0${minute}`);
      }
      if (hour < 10 && minute >= 10 && minute !== 60) {
        count.push(`0${hour}:${minute}`);
      }
    }
    return count;
  };

  const heartRateDataObj = todaysData?.data?.hr_5min.map((heartRate, idx) => {
    const time = timeIncrement(timeStart, sleepDuration)[idx];

    return {
      heartRate: heartRate,
      timeDuration: time,
    };
  });

  const hrvData = todaysData?.data?.rmssd_5min.map((hrv, idx) => {
    const time = timeIncrement(timeStart, sleepDuration)[idx];

    return {
      HRV: hrv,
      timeDuration: time,
    };
  });

  return (
    <div>
      <RenderSleepData
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
        bedtimeStart={timeStart}
        bedtimeEnd={timeEnd}
        avgHRData={avgHRData}
        data={todaysData.data}
        width={"width"}
        height={"height"}
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

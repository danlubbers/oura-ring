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

  // const bedtimeStartTest = bedtimeStart.slice(0, 5);
  // console.log(`bedtimeStartTest`, bedtimeStartTest);

  const bedtimeEnd = new Date(todaysData?.data?.bedtime_end);
  const timeEnd = moment(bedtimeEnd).format("HH:mm");

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

  const timeIncrement = (startTime, endTime) => {
    let count = [];
    let increment = 5; // increase 5min
    let times = startTime.split(":");

    //clear here more than 24 hours
    // increment = increment % (24 * 60);
    let hour = parseInt(times[0]) + parseInt(increment / 60);
    let minute = parseInt(times[1]) + (increment % 60);

    console.log(`hour`, hour);
    console.log(`minute`, minute);

    for (let i = 0; i < 10; i++) {
      minute += increment;
      console.log(`minute`, minute);

      // i += increment;
      // count.push(i);
      if (minute >= 60) {
        // console.log("60 minute HIT");
        minute = 0;
        hour++;
        console.log(`hour:minute`, `${hour}:${minute}`);
      }
      if (hour >= 24) {
        console.log("HOUR HIT");
        count.push((hour -= 24));
      }
      // // //here control if less than 10 then put 0 in front of them
      // if (hour < 10) {
      //   console.log("HOUR < 10 HIT");
      //   count.push((hour = "0" + hour));
      // }
      // if (min < 10) {
      //   console.log(`"0" + increment`, "0" + increment);
      //   count.push((min = "0" + increment));
      // }

      // count.push(times.join(":"));
    }

    return count;
  };

  console.log(`timeIncrement(timeStart)`, timeIncrement(timeStart));

  const heartRateDataObj = filterOutZeros?.map((heartRate, idx) => {
    return {
      heartRate: heartRate,
      timeDuration: idx,
    };
  });

  // console.log(`heartRateDataObj`, heartRateDataObj);

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
        bedtimeStart={timeStart}
        bedtimeEnd={timeEnd}
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

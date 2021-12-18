import React, { useContext, useState, useEffect } from "react";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import { GlobalContext } from "../context/Provider";
import moment from "moment";
import { timeIncrement } from "../utilities/incrementTime";
import { secondsToHm } from "../utilities/convertTime";

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

  // Contributors
  const total = todaysData?.data?.total;
  const totalScore = todaysData?.data?.score_total;
  const efficiency = todaysData?.data?.efficiency;
  const efficiencyScore = todaysData?.data?.score_efficiency;
  const restfulnessScore = todaysData?.data?.score_disturbances;
  const rem = todaysData?.data?.rem;
  const remScore = todaysData?.data?.score_rem;
  const remPercentage = Math.round(((rem - total) / total + 1) * 100);
  const deepSleep = todaysData?.data?.deep;
  const deepSleepScore = todaysData?.data?.score_deep;
  const deepSleepPercentage = Math.round(
    ((deepSleep - total) / total + 1) * 100
  );
  const onsetLatency = todaysData?.data?.onset_latency;
  const latencyScore = todaysData?.data?.score_latency;
  const alignmentScore = todaysData?.data?.score_alignment;

  const sleepContributorData = [
    { name: "Total Sleep", score: totalScore },
    { name: "Efficiency", score: efficiencyScore, data: efficiency },
    { name: "Restfulness", score: restfulnessScore },
    {
      name: "REM sleep",
      score: remScore,
      data: rem,
      percentage: remPercentage,
    },
    {
      name: "Deep sleep",
      score: deepSleepScore,
      data: deepSleep,
      percentage: deepSleepPercentage,
    },
    { name: "Latency", score: latencyScore, data: onsetLatency },
    { name: "Timing", score: alignmentScore },
  ];

  const bedtimeStart = new Date(todaysData?.data?.bedtime_start);

  const timeStart = moment(bedtimeStart).format("HH:mm");
  const sleepDuration = todaysData?.data?.duration;

  const bedtimeEnd = new Date(todaysData?.data?.bedtime_end);
  const timeEnd = moment(bedtimeEnd).format("HH:mm");

  const totalSleep = secondsToHm(todaysData?.data?.total);
  const timeInBed = secondsToHm(sleepDuration);
  const sleepEfficiency = todaysData?.data?.efficiency;

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

  const heartRateData = todaysData?.data?.hr_5min
    ?.map((heartRate, idx) => {
      const time = timeIncrement(timeStart, sleepDuration)[idx];

      return {
        heartRate: heartRate,
        timeDuration: time,
      };
    })
    .filter((obj) => obj.heartRate !== 0); // Filter out bad data due to ring logging 0's due to a bad connection
  // console.log(`heartRateData`, heartRateData);

  const hrvData = todaysData?.data?.rmssd_5min
    ?.map((hrv, idx) => {
      const time = timeIncrement(timeStart, sleepDuration)[idx];

      return {
        HRV: hrv,
        timeDuration: time,
      };
    })
    .filter((obj) => obj.HRV !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

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
        heartRateData={heartRateData}
        hrvData={hrvData}
        totalSleep={totalSleep}
        timeInBed={timeInBed}
        sleepEfficiency={sleepEfficiency}
        sleepContributorData={sleepContributorData}
      />
      <NavigationHeader />
    </div>
  );
}

export default SleepData;

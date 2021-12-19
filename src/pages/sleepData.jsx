import React, { useContext, useState, useEffect } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
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

  const score = todaysData?.data?.score;

  // Quad Data
  const totalSleep = secondsToHm(todaysData?.data?.total);
  const sleepDuration = todaysData?.data?.duration;
  const timeInBed = secondsToHm(sleepDuration);
  const sleepEfficiency = todaysData?.data?.efficiency;

  // Quad and Chart Data
  const avgHRV = todaysData?.data?.rmssd;
  const maxHRV = todaysData?.data && Math.max(...todaysData?.data?.rmssd_5min);

  // Contributors
  const total = todaysData?.data?.total;
  const totalScore = todaysData?.data?.score_total;
  const efficiency = todaysData?.data?.efficiency;
  const efficiencyScore = todaysData?.data?.score_efficiency;
  const restfulnessScore = todaysData?.data?.score_disturbances;
  const rem = todaysData?.data?.rem;
  const remScore = todaysData?.data?.score_rem;
  // rem seconds - total sleep seconds divided by the total sleep seconds then convert that to the percentage and round to nearest integer
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

  // Chart Data
  const timeStart = new Date(todaysData?.data?.bedtime_start);
  const bedtimeStart = moment(timeStart).format("HH:mm");
  const timeEnd = new Date(todaysData?.data?.bedtime_end);
  const bedtimeEnd = moment(timeEnd).format("HH:mm");
  const minHeartRate = todaysData?.data?.hr_lowest;
  const maxHeartRate =
    todaysData?.data && Math.max(...todaysData?.data?.hr_5min);

  const heartRateData = todaysData?.data?.hr_5min
    ?.map((heartRate, idx) => {
      const time = timeIncrement(bedtimeStart, sleepDuration)[idx];

      return {
        heartRate: heartRate,
        timeDuration: time,
      };
    })
    .filter((obj) => obj.heartRate !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const hrvData = todaysData?.data?.rmssd_5min
    ?.map((hrv, idx) => {
      const time = timeIncrement(bedtimeStart, sleepDuration)[idx];

      return {
        HRV: hrv,
        timeDuration: time,
      };
    })
    .filter((obj) => obj.HRV !== 0); // Filter out bad data due to ring logging 0's due to a bad connection

  const avgHRData = todaysData?.data?.hr_5min.reduce(
    (avg, value, _, { length }) => {
      return avg + value / length;
    },
    0
  );

  return (
    <div>
      <DateRenderer
        todaysDate={todaysData.date}
        setTodaysData={setTodaysData}
      />
      <RenderSleepData
        score={score}
        todaysDate={todaysData.date}
        totalSleep={totalSleep}
        timeInBed={timeInBed}
        sleepEfficiency={sleepEfficiency}
        bedtimeStart={bedtimeStart}
        bedtimeEnd={bedtimeEnd}
        avgHRData={avgHRData}
        minHeartRate={minHeartRate}
        maxHeartRate={maxHeartRate}
        avgHRV={avgHRV}
        maxHRV={maxHRV}
        heartRateData={heartRateData}
        hrvData={hrvData}
        sleepContributorData={sleepContributorData}
      />
      <NavigationFooter />
    </div>
  );
}

export default SleepData;

import { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { timeIncrement } from "../utilities/incrementTime";
import { secondsToHm } from "../utilities/convertTime";
import { getAverages } from "../utilities/getAverages";

function SleepData() {
  const {
    todaysData: { date, bedtimeStart, data },
  } = useContext(GlobalContext);
  console.log(`Sleep: todaysData`, data);

  // Time Data
  const bedtimeStartHourAndMin = bedtimeStart && bedtimeStart.slice(11, 16);

  // Quad Data
  const totalSleep = secondsToHm(data?.sleepPeriod?.total_sleep_duration);
  const sleepDuration = data?.sleepPeriod?.time_in_bed;
  const timeInBed = secondsToHm(sleepDuration);
  const sleepEfficiency = data?.sleepPeriod?.efficiency;

  // Quad and Heartrate/HRV Chart Data
  const avgHRV = data?.sleepPeriod?.average_hrv;
  const maxHRV =
    data?.sleepPeriod && Math.max(...data?.sleepPeriod?.hrv?.items);

  // Overall Score
  const score = data?.dailySleep?.score;

  // Contributors
  const total = data?.sleepPeriod?.total_sleep_duration;
  const totalScore = data?.dailySleep?.score;
  const efficiency = data?.sleepPeriod?.efficiency;
  const efficiencyScore = data?.dailySleep?.contributors?.efficiency;
  const restfulnessScore = data?.dailySleep?.contributors?.restfulness;
  const remSleep = data?.sleepPeriod?.rem_sleep_duration;
  const remScore = data?.dailySleep?.contributors?.rem_sleep;
  // rem seconds - total sleep seconds divided by the total sleep seconds then convert that to the percentage and round to nearest integer
  const remPercentage = Math.round(((remSleep - total) / total + 1) * 100);
  const deepSleep = data?.sleepPeriod?.deep_sleep_duration;
  const deepSleepScore = data?.dailySleep?.contributors?.deep_sleep;
  const deepSleepPercentage = Math.round(
    ((deepSleep - total) / total + 1) * 100
  );
  const onsetLatency = data?.sleepPeriod?.latency;
  const latencyScore = data?.dailySleep?.contributors?.latency;
  const alignmentScore = data?.dailySleep?.contributors?.timing;

  const sleepContributorData = [
    { name: "Total Sleep", score: totalScore },
    { name: "Efficiency", score: efficiencyScore, data: efficiency },
    { name: "Restfulness", score: restfulnessScore },
    {
      name: "REM sleep",
      score: remScore,
      data: remSleep,
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

  // Sleep Stages/Percentages that aren't already declared
  const awakeSleep = data?.sleepPeriod?.awake_time;
  const awakePercentage = Math.round(((awakeSleep - total) / total + 1) * 100);
  const lightSleep = data?.sleepPeriod?.light_sleep_duration;
  const lightPercentage = Math.round(((lightSleep - total) / total + 1) * 100);

  const sleepStagesData = [
    {
      stage: "Awake",
      seconds: awakeSleep,
      percentage: awakePercentage,
      showPercentage: false,
      color: "#3DCEB7",
    },
    {
      stage: "REM",
      seconds: remSleep,
      percentage: remPercentage,
      showPercentage: true,
      color: "#37A3B3",
    },
    {
      stage: "Light",
      seconds: lightSleep,
      percentage: lightPercentage,
      showPercentage: true,
      color: "#3C50D5",
    },
    {
      stage: "Deep",
      seconds: deepSleep,
      percentage: deepSleepPercentage,
      showPercentage: true,
      color: "#303EA0",
    },
  ];

  // Sleep Chart Data
  const hypnogramData = data?.sleepPeriod?.sleep_phase_5_min
    .split("")
    ?.map((sleepLevel, idx) => {
      const time = timeIncrement(bedtimeStartHourAndMin, sleepDuration)[idx];

      let sleepStage = "";
      if (parseInt(sleepLevel) === 1) {
        sleepStage = "Deep";
      }
      if (parseInt(sleepLevel) === 2) {
        sleepStage = "Light";
      }
      if (parseInt(sleepLevel) === 3) {
        sleepStage = "REM";
      }
      if (parseInt(sleepLevel) === 4) {
        sleepStage = "Awake";
      }

      return {
        sleepData: { sleepStage, sleepLevel },
        timeDuration: parseInt(time),
      };
    });

  // console.log(`hypnogramData`, hypnogramData);

  // Heartrate/HRV Chart Data
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
      <RenderSleepData
        score={score}
        todaysDate={date}
        totalSleep={totalSleep}
        timeInBed={timeInBed}
        sleepEfficiency={sleepEfficiency}
        avgHRData={avgHRData}
        minHeartRate={minHeartRate}
        maxHeartRate={maxHeartRate}
        avgHRV={avgHRV}
        maxHRV={maxHRV}
        hypnogramData={hypnogramData}
        sleepStagesData={sleepStagesData}
        heartRateData={heartRateData}
        hrvData={hrvData}
        sleepContributorData={sleepContributorData}
      />
      <NavigationFooter />
    </div>
  );
}

export default SleepData;

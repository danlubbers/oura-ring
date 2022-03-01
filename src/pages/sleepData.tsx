import { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderSleepData from "../components/RenderSleepData/RenderSleepData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { timeIncrement } from "../utilities/incrementTime";
import { secondsToHm } from "../utilities/convertTime";

function SleepData() {
  const {
    todaysData: { date, bedtimeStart, data },
  } = useContext(GlobalContext);
  // console.log(`Sleep: todaysData`, todaysData);

  // Time Data
  const bedtimeStartHourAndMin = bedtimeStart && bedtimeStart.slice(11, 16);

  // Quad Data
  const totalSleep = secondsToHm(data?.sleep?.total);
  const sleepDuration = data?.sleep?.duration;
  const timeInBed = secondsToHm(sleepDuration);
  const sleepEfficiency = data?.sleep?.efficiency;

  // Quad and Heartrate/HRV Chart Data
  const avgHRV = data?.sleep?.rmssd;
  const maxHRV = data?.sleep && Math.max(...data?.sleep?.rmssd_5min);

  // Overall Score
  const score = data?.sleep?.score;

  // Contributors
  const total = data?.sleep?.total;
  const totalScore = data?.sleep?.score_total;
  const efficiency = data?.sleep?.efficiency;
  const efficiencyScore = data?.sleep?.score_efficiency;
  const restfulnessScore = data?.sleep?.score_disturbances;
  const remSleep = data?.sleep?.rem;
  const remScore = data?.sleep?.score_rem;
  // rem seconds - total sleep seconds divided by the total sleep seconds then convert that to the percentage and round to nearest integer
  const remPercentage = Math.round(((remSleep - total) / total + 1) * 100);
  const deepSleep = data?.sleep?.deep;
  const deepSleepScore = data?.sleep?.score_deep;
  const deepSleepPercentage = Math.round(
    ((deepSleep - total) / total + 1) * 100
  );
  const onsetLatency = data?.sleep?.onset_latency;
  const latencyScore = data?.sleep?.score_latency;
  const alignmentScore = data?.sleep?.score_alignment;

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
  const awakeSleep = data?.sleep?.awake;
  const awakePercentage = Math.round(((awakeSleep - total) / total + 1) * 100);
  const lightSleep = data?.sleep?.light;
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
  const hypnogramData = data?.sleep?.hypnogram_5min
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

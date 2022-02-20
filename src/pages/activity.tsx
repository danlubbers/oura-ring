import { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderActivityData from "../components/RenderActivityData/RenderActivityData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { secondsToHm } from "../utilities/convertTime";

function Activity() {
  const { todaysData } = useContext(GlobalContext);
  // console.log(`Activity: todaysData`, todaysData.data?.activity);

  // Quad Data
  const calActive =
    todaysData.data?.activity.cal_active.toLocaleString("en-US");
  const calTotal = todaysData.data?.activity.cal_total.toLocaleString("en-US");
  const walkingEquivalency = (
    todaysData.data?.activity.daily_movement / 1609.344
  ).toFixed(1); // convert meters to miles
  const steps = todaysData.data?.activity.steps.toLocaleString("en-US");

  // Overall Score
  const score = todaysData.data?.activity.score;

  // Contributors
  const inactive = secondsToHm(todaysData.data?.activity.inactive * 60); // this score is in minutes so multiply by 60 to convert to seconds for the function parameter
  const stayActiveScore = todaysData.data?.activity.score_stay_active;
  const moveEveryHourScore = todaysData.data?.activity.score_move_every_hour;
  const inactivityAlerts = todaysData.data?.activity.inactivity_alerts;
  const meetDailyGoalsScore =
    todaysData.data?.activity.score_meet_daily_targets;
  const trainingFrequencyScore =
    todaysData.data?.activity.score_training_frequency;
  const trainingVolumeScore = todaysData.data?.activity.score_training_volume;
  const recoveryTimeScore = todaysData.data?.activity.score_recovery_time;

  const activityContributorData = [
    { name: "Stay active", score: stayActiveScore, data: parseInt(inactive) },
    {
      name: "Move every hour",
      score: moveEveryHourScore,
      data: inactivityAlerts,
    },
    { name: "Meet daily goals", score: meetDailyGoalsScore },
    { name: "Training frequency", score: trainingFrequencyScore },
    { name: "Training Volume", score: trainingVolumeScore },
    { name: "Recovery Time", score: recoveryTimeScore },
  ];

  const metFiveMinArray = todaysData.data?.activity.class_5min
    .split("")
    .map((met, idx) => {
      // start at 4am and add 5min to each index
      return {
        met: met,
        index: idx, // need to convert to 4am - 4am
      };
    })
    .filter((e) => parseInt(e.met) < 5 || parseInt(e.met) !== 0);
  // console.log(`metFiveMinArray`, metFiveMinArray);

  // Move Stages
  const total = todaysData?.data?.activity?.total * 60; // Convert to seconds from minutes
  const highSeconds = todaysData?.data?.activity?.high * 60;
  const highPercentage = Math.round(((highSeconds - total) / total + 1) * 100);
  const mediumSeconds = todaysData?.data?.activity?.medium * 60;
  const mediumPercentage = Math.round(
    ((mediumSeconds - total) / total + 1) * 100
  );
  const lowSeconds = todaysData?.data?.activity?.low * 60;
  const lowPercentage = Math.round(((lowSeconds - total) / total + 1) * 100);

  const activityStagesData = [
    {
      stage: "High",
      seconds: highSeconds,
      percentage: highPercentage,
      showPercentage: false,
      color: "#3DCEB7",
    },
    {
      stage: "Medium",
      seconds: mediumSeconds,
      percentage: mediumPercentage,
      showPercentage: false,
      color: "#37A3B3",
    },
    {
      stage: "Low",
      seconds: lowSeconds,
      percentage: lowPercentage,
      showPercentage: false,
      color: "#3C50D5",
    },
  ];

  return (
    <div>
      <DateRenderer />
      <RenderActivityData
        score={score}
        todaysDate={todaysData.date}
        calActive={calActive}
        calTotal={calTotal}
        walkingEquivalency={walkingEquivalency}
        steps={steps}
        activityContributorData={activityContributorData}
        metFiveMinArray={metFiveMinArray}
        activityStagesData={activityStagesData}
      />
      <NavigationFooter />
    </div>
  );
}

export default Activity;

import { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderActivityData from "../components/RenderActivityData/RenderActivityData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { secondsToHm } from "../utilities/convertTime";

function Activity() {
  const { todaysData } = useContext(GlobalContext);
  console.log(`Activity: todaysData`, todaysData);

  // Quad Data
  const calActive =
    todaysData.data?.activity?.active_calories.toLocaleString("en-US");
  console.log("calActive PAGE", calActive);
  const calTotal =
    todaysData.data?.activity?.total_calories.toLocaleString("en-US");
  const walkingEquivalency = (
    todaysData.data?.activity?.equivalent_walking_distance / 1609.344
  ).toFixed(1); // convert meters to miles
  const steps = todaysData.data?.activity?.steps.toLocaleString("en-US");

  // Overall Score
  const score = todaysData.data?.activity?.score;

  // Contributors
  const inactive = secondsToHm(
    todaysData.data?.activity?.inactivity_alerts * 60
  ); // this score is in minutes so multiply by 60 to convert to seconds for the function parameter
  const stayActiveScore = todaysData.data?.activity?.score;
  const moveEveryHourScore =
    todaysData.data?.activity?.contributors?.move_every_hour;
  const inactivityAlerts = todaysData.data?.activity?.inactivity_alerts;
  const meetDailyGoalsScore =
    todaysData.data?.activity?.contributors?.meet_daily_targets;
  const trainingFrequencyScore =
    todaysData.data?.activity?.contributors?.training_frequency;
  const trainingVolumeScore =
    todaysData.data?.activity?.contributors?.training_volume;
  const recoveryTimeScore =
    todaysData.data?.activity?.contributors?.recovery_time;

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

  const metFiveMinArray = todaysData.data?.activity?.class_5_min
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
  const total = todaysData?.data?.activity?.score * 60; // Convert to seconds from minutes
  const highSeconds = todaysData?.data?.activity?.high_activity_time * 60;
  const highPercentage = Math.round(((highSeconds - total) / total + 1) * 100);
  const mediumSeconds = todaysData?.data?.activity?.medium_activity_time * 60;
  const mediumPercentage = Math.round(
    ((mediumSeconds - total) / total + 1) * 100
  );
  const lowSeconds = todaysData?.data?.activity?.low_activity_time * 60;
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

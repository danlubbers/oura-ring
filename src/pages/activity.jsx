import React, { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderActivityData from "../components/RenderActivityData/RenderActivityData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
// import moment from "moment";
// import { timeIncrement } from "../utilities/incrementTime";

function Activity() {
  const { todaysData } = useContext(GlobalContext);
  console.log(`Activity: todaysData`, todaysData.data?.activity);

  // Quad Data
  const calActive =
    todaysData.data?.activity.cal_active.toLocaleString("en-US");
  const calTotal = todaysData.data?.activity.cal_total.toLocaleString("en-US");
  const walkingEquivalency = (
    todaysData.data?.activity.daily_movement / 1609.344
  ).toFixed(1); // convert meters to miles
  const steps = todaysData.data?.activity.steps.toLocaleString("en-US");

  // Quad and Chart Data

  // Overall Score
  const score = todaysData.data?.activity.score;

  // Contributors

  // Chart Data

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
      />
      <NavigationFooter />
    </div>
  );
}

export default Activity;

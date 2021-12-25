import React, { useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderActivityData from "../components/RenderActivityData/RenderActivityData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
// import moment from "moment";
// import { timeIncrement } from "../utilities/incrementTime";

function Activity() {
  const { todaysData } = useContext(GlobalContext);
  // console.log(`Readiness: todaysData`, todaysData);

  // Quad Data

  // Quad and Chart Data

  // Overall Score

  // Contributors

  // Chart Data

  return (
    <div>
      <DateRenderer />
      <RenderActivityData todaysDate={todaysData.date} />
      <NavigationFooter />
    </div>
  );
}

export default Activity;

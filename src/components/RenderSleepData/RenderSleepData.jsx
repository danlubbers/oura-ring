import React, { useContext } from "react";
import * as styles from "./RenderSleepData.module.scss";
import { GlobalContext } from "../../context/Provider";
import Container from "../Container/Container";

const RenderSleepData = () => {
  const { ouraData } = useContext(GlobalContext);
  const sleepData = ouraData?.ouraSleepData?.data.sleep;
  console.log(`sleepData`, sleepData);
  const prevNightsData = sleepData?.[sleepData?.length - 1];

  const bedtimeStart = new Date(
    prevNightsData?.bedtime_start
  ).toLocaleTimeString();
  const bedtimeEnd = new Date(prevNightsData?.bedtime_end).toLocaleTimeString();
  // console.log(`bedtimeStart`, bedtimeStart);
  // console.log(`bedtimeEnd`, bedtimeEnd);

  // const heartRateData = prevNightsData?.hr_5min.map((hr, idx) => {
  //   return (
  //     <div key={idx}>
  //       <span>{hr}</span>
  //     </div>
  //   );
  // });
  // const hrvData = prevNightsData?.rmssd_5min.sort().map((hr, idx) => {
  //   return (
  //     <div key={idx}>
  //       <span>{hr}</span>
  //     </div>
  //   );
  // });

  return (
    <Container>
      <div className={styles.renderSleepDataContainer}>
        <h1>Last Nights Sleep Data</h1>
        <p>{prevNightsData?.summary_date}</p>
        <span>{bedtimeStart} - </span>
        <span>{bedtimeEnd}</span>
        <p>Lowest Heart Rate: {prevNightsData?.hr_lowest} bpm</p>
        {/* {heartRateData} */}
        {/* {hrvData} */}
      </div>
    </Container>
  );
};

export default RenderSleepData;

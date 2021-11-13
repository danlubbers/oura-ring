import React, { useContext } from "react";
import * as styles from "./RenderSleepData.module.scss";
import { GlobalContext } from "../../context/Provider";

const RenderUserData = () => {
  const { ouraData } = useContext(GlobalContext);
  const sleepData = ouraData?.ouraSleepData?.data.sleep;
  // console.log(`sleepData`, sleepData);
  const prevNightsData = sleepData?.[sleepData?.length - 1];

  return (
    <div className={styles.renderSleepDataContainer}>
      <h1>Last Nights Sleep Data</h1>
      <p>{prevNightsData?.summary_date}</p>
      <p>Lowest Heart Rate: {prevNightsData?.hr_lowest} bpm</p>
    </div>
  );
};

export default RenderUserData;

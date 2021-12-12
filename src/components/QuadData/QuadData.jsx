import React from "react";
import * as styles from "./QuadData.module.scss";

const QuadData = ({
  readiness,
  quadOneText,
  quadOneData,
  quadTwoText,
  quadTwoData,
  quadThreeText,
  quadThreeData,
  quadFourText,
  quadFourData,
}) => {
  return (
    <div className={styles.quadDataWrapper}>
      <div className={styles.quadOneDataWrapper}>
        <p>{quadOneText}</p>
        <span className={styles.quadOneText}>{quadOneData}</span>
        {readiness && <span> bpm</span>}
      </div>
      <div className={styles.quadTwoDataWrapper}>
        <p>{quadTwoText}</p>
        <span className={styles.quadTwoText}>{quadTwoData}</span>
        {readiness && <span> ms</span>}
      </div>
      <div className={styles.quadThreeDataWrapper}>
        <p>{quadThreeText}</p>
        <span className={styles.quadThreeText}>{quadThreeData} </span>
        {readiness ? <span>°F</span> : <span>%</span>}
      </div>
      <div className={styles.quadFourDataWrapper}>
        <p>{quadFourText}</p>
        <span className={styles.quadFourText}>{quadFourData}</span>{" "}
        {readiness ? <span>/ min</span> : <span>bpm</span>}
      </div>
    </div>
  );
};

export default QuadData;

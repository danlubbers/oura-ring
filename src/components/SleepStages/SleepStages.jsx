import React from "react";
import * as styles from "./SleepStages.module.scss";
import { secondsToHm } from "../../utilities/convertTime";

const SleepStages = ({ sleepStagesData }) => {
  const sleepStages = sleepStagesData.map(
    ({ stage, sleepSeconds, percentage, color }, idx) => {
      return (
        <div className={styles.sleepStagesWrapper} key={`${stage}-${idx}`}>
          <div className={styles.sleepStagesWrapper}>
            <div
              style={{
                width: `${percentage}%`,
                backgroundColor: `${color}`,
              }}
              className={[styles.line]}
            />
          </div>
          <span className={styles.sleepStageText}>{stage}</span>
          <span className={styles.sleepStageTime}>
            {secondsToHm(sleepSeconds)}
          </span>
          {percentage && (
            <span className={styles.sleepStagePercentage}>{percentage}%</span>
          )}
        </div>
      );
    }
  );
  return <div className={styles.sleepStagesContainer}>{sleepStages}</div>;
};

export default SleepStages;

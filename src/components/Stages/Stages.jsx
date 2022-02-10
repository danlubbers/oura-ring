import React from "react";
import styles from "./Stages.module.scss";
import { secondsToHm } from "../../utilities/convertTime";

const Stages = ({ stagesData }) => {
  const stages = stagesData.map(
    ({ stage, seconds, percentage, showPercentage, color }, idx) => {
      return (
        <div className={styles.stagesWrapper} key={`${stage}-${idx}`}>
          <div className={styles.stagesWrapper}>
            <div
              style={{
                width: `${percentage}%`,
                backgroundColor: `${color}`,
              }}
              className={[styles.line]}
            />
          </div>
          <span className={styles.stageText}>{stage}</span>
          <span className={styles.stageTime}>{secondsToHm(seconds)}</span>
          {showPercentage && (
            <span className={styles.stagePercentage}>{percentage}%</span>
          )}
        </div>
      );
    }
  );
  return <div className={styles.stagesContainer}>{stages}</div>;
};

export default Stages;

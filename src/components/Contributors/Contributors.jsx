import React from "react";
import * as styles from "./Contributors.module.scss";

const Contributors = ({ readinessContributorData, restingHR }) => {
  const contributionLoop = readinessContributorData.map(
    ({ name, score }, idx) => {
      const scoring = (score) => {
        if (score <= 100 && score >= 85) {
          return "Optimal";
        } else if (score < 85 && score >= 70) {
          return "Good";
        } else return "Pay Attention";
      };

      return (
        <div key={`${name}-${idx}`}>
          <div className={styles.textWrapper}>
            <span>{name} </span>
            {name === "Resting heart rate" ? (
              <span style={{ color: score < 70 && "#DC143C" }}>
                {restingHR} bpm
              </span>
            ) : (
              <span style={{ color: score < 70 && "#DC143C" }}>
                {scoring(score)}
              </span>
            )}
          </div>

          <div className={styles.lineWrapper}>
            <div className={[styles.lineBackground]} />
            <div
              style={{
                width: `${score}%`,
                backgroundColor: score < 70 && "#DC143C",
              }}
              className={[styles.line]}
            />
          </div>
        </div>
      );
    }
  );

  return (
    <div className={styles.contributorContainer}>
      <p>Readiness Contributors</p>
      {contributionLoop}
    </div>
  );
};

export default Contributors;

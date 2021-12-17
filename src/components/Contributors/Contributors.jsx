import React from "react";
import * as styles from "./Contributors.module.scss";
import { secondsToHm } from "../../utilities/convertTime";

const Contributors = ({
  readinessContributorData,
  restingHR,
  sleepContributorData,
  totalSleep,
}) => {
  let contributionLoop;

  const scoring = (score) => {
    if (score <= 100 && score >= 85) {
      return "Optimal";
    } else if (score < 85 && score >= 70) {
      return "Good";
    } else return "Pay Attention";
  };

  if (readinessContributorData) {
    contributionLoop = readinessContributorData.map(({ name, score }, idx) => {
      const negativeScoreRating = score < 70 && "#DC143C";
      return (
        <div key={`${name}-${idx}`}>
          <div className={styles.textWrapper}>
            <span>{name} </span>
            {name === "Resting heart rate" ? (
              <span style={{ color: negativeScoreRating }}>
                {restingHR} bpm
              </span>
            ) : (
              <span style={{ color: negativeScoreRating }}>
                {scoring(score)}
              </span>
            )}
          </div>

          <div className={styles.lineWrapper}>
            <div className={[styles.lineBackground]} />
            <div
              style={{
                width: `${score}%`,
                backgroundColor: negativeScoreRating,
              }}
              className={[styles.line]}
            />
          </div>
        </div>
      );
    });
  }

  if (sleepContributorData) {
    contributionLoop = sleepContributorData.map(
      ({ name, score, data }, idx) => {
        const negativeScoreRating = score < 70 && "#DC143C";
        return (
          <div key={`${name}-${idx}`}>
            <div className={styles.textWrapper}>
              <span>{name} </span>
              {name === "Total Sleep" && <span>{totalSleep}</span>}
              {name === "Efficiency" && (
                <span style={{ color: negativeScoreRating }}>{data}%</span>
              )}
              {name === "Restfulness" && (
                <span style={{ color: negativeScoreRating }}>
                  {scoring(score)}
                </span>
              )}
              {name === "REM sleep" && (
                <span style={{ color: negativeScoreRating }}>
                  {secondsToHm(data)}
                </span>
              )}
              {name === "Deep sleep" && (
                <span style={{ color: negativeScoreRating }}>
                  {secondsToHm(data)}
                </span>
              )}
              {name === "Latency" && (
                <span style={{ color: negativeScoreRating }}>
                  {secondsToHm(data)}
                </span>
              )}
              {name === "Timing" && (
                <span style={{ color: negativeScoreRating }}>
                  {scoring(score)}
                </span>
              )}
            </div>

            <div className={styles.lineWrapper}>
              <div className={[styles.lineBackground]} />
              <div
                style={{
                  width: `${score}%`,
                  backgroundColor: negativeScoreRating,
                }}
                className={[styles.line]}
              />
            </div>
          </div>
        );
      }
    );
  }

  return (
    <div className={styles.contributorContainer}>
      {readinessContributorData ? (
        <p>Readiness Contributors</p>
      ) : (
        <p>Sleep Contributors</p>
      )}
      {contributionLoop}
    </div>
  );
};

export default Contributors;

import styles from "./Contributors.module.scss";
import { secondsToHm } from "../../utilities/convertTime";
import { scoring } from "../../utilities/scoring";

const Contributors = ({
  readinessContributorData,
  restingHR,
  sleepContributorData,
  totalSleep,
  activityContributorData,
}: {
  readinessContributorData?: { name: string; score: number }[];
  restingHR?: number;
  sleepContributorData?:
    | {
        name: string;
        score: number;
        data?: number;
        percentage?: number;
      }[];
  totalSleep?: number;
  activityContributorData?: { name: string; score: number; data: number }[];
}) => {
  let contributionLoop;

  if (readinessContributorData) {
    contributionLoop = readinessContributorData.map(({ name, score }, idx) => {
      const negativeScoreRating = score < 70 ? "#DC143C" : "";
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
            <div className={styles.lineBackground} />
            <div
              style={{
                width: `${score}%`,
                backgroundColor: negativeScoreRating,
              }}
              className={styles.line}
            />
          </div>
        </div>
      );
    });
  }

  if (sleepContributorData) {
    contributionLoop = sleepContributorData.map(
      ({ name, score, data, percentage }, idx) => {
        const negativeScoreRating = score < 70 ? "#DC143C" : "";
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
                <div>
                  <span
                    style={{ color: negativeScoreRating, marginRight: "1rem" }}
                  >
                    {data && secondsToHm(data)},
                  </span>
                  <span>{percentage}%</span>
                </div>
              )}
              {name === "Deep sleep" && (
                <div>
                  <span
                    style={{ color: negativeScoreRating, marginRight: "1rem" }}
                  >
                    {data && secondsToHm(data)},
                  </span>
                  <span>{percentage}%</span>
                </div>
              )}
              {name === "Latency" && (
                <span style={{ color: negativeScoreRating }}>
                  {data && secondsToHm(data)}
                </span>
              )}
              {name === "Timing" && (
                <span style={{ color: negativeScoreRating }}>
                  {scoring(score)}
                </span>
              )}
            </div>

            <div className={styles.lineWrapper}>
              <div className={styles.lineBackground} />
              <div
                style={{
                  width: `${score}%`,
                  backgroundColor: negativeScoreRating,
                }}
                className={styles.line}
              />
            </div>
          </div>
        );
      }
    );
  }

  if (activityContributorData) {
    contributionLoop = activityContributorData.map(
      ({ name, score, data }, idx) => {
        const negativeScoreRating = score < 70 ? "#DC143C" : "";
        return (
          <div key={`${name}-${idx}`}>
            <div className={styles.textWrapper}>
              <span>{name}</span>
              {name === "Stay active" && (
                <div>
                  <span
                    style={{ color: negativeScoreRating, marginRight: "1rem" }}
                  >
                    {data},
                  </span>
                  <span style={{ color: negativeScoreRating }}>inactivity</span>
                </div>
              )}
              {name === "Move every hour" && (
                <div>
                  <span
                    style={{ color: negativeScoreRating, marginRight: "1rem" }}
                  >
                    {data},
                  </span>
                  <span>alerts</span>
                </div>
              )}
              {name !== "Stay active" && name !== "Move every hour" && (
                <>
                  <span>{data}</span>
                  <span style={{ color: negativeScoreRating }}>
                    {scoring(score)}
                  </span>
                </>
              )}
            </div>

            <div className={styles.lineWrapper}>
              <div className={styles.lineBackground} />
              <div
                style={{
                  width: `${score}%`,
                  backgroundColor: negativeScoreRating,
                }}
                className={styles.line}
              />
            </div>
          </div>
        );
      }
    );
  }

  return (
    <div className={styles.contributorContainer}>
      {readinessContributorData && <p>Readiness Contributors</p>}
      {sleepContributorData && <p>Sleep Contributors</p>}
      {activityContributorData && <p>Activity Contributors</p>}
      {contributionLoop}
    </div>
  );
};

export default Contributors;

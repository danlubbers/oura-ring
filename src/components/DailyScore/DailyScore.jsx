import * as styles from "./DailyScore.module.scss";
import { scoring } from "../../utilities/scoring";

const DailyScore = ({ readiness, score }) => {
  return (
    <div className={styles.scoreWrapper}>
      {readiness ? (
        <p className={styles.text}>READINESS</p>
      ) : (
        <p className={styles.text}>SLEEP</p>
      )}
      <span className={styles.scoreData}>{score} </span>
      <span>{scoring(score)}</span>
    </div>
  );
};

export default DailyScore;

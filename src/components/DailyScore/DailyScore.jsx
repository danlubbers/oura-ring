import * as styles from "./DailyScore.module.scss";
import { scoring } from "../../utilities/scoring";

const DailyScore = ({ readiness, sleep, activity, score }) => {
  return (
    <div className={styles.scoreWrapper}>
      {readiness && <p className={styles.text}>READINESS</p>}
      {sleep && <p className={styles.text}>SLEEP</p>}
      {activity && <p className={styles.text}>ACTIVITY</p>}
      <span className={styles.scoreData}>{score} </span>
      <span>{scoring(score)}</span>
    </div>
  );
};

export default DailyScore;

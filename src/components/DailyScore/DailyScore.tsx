import styles from "./DailyScore.module.scss";
import { scoring } from "../../utilities/scoring";
import { DailyScoreProps } from "../../types/dataTypes";

const DailyScore: React.FC<DailyScoreProps> = ({
  isReadiness,
  isSleep,
  isActivity,
  score,
}) => {
  return (
    <div className={styles.scoreWrapper}>
      {isReadiness && <p className={styles.text}>READINESS</p>}
      {isSleep && <p className={styles.text}>SLEEP</p>}
      {isActivity && <p className={styles.text}>ACTIVITY</p>}
      <span className={styles.scoreData}>{score} </span>
      <span>{scoring(score)}</span>
    </div>
  );
};

export default DailyScore;

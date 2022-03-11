import styles from "./Stages.module.scss";
import { secondsToHm } from "../../utilities/convertTime";
import { StagesProps } from "../../types/dataTypes";

const Stages: React.FC<StagesProps> = ({ stagesData }) => {
  const stages = stagesData?.map(
    ({ stage, seconds, percentage, showPercentage, color }, idx: number) => {
      return (
        <div className={styles.stagesWrapper} key={`${stage}-${idx}`}>
          <div className={styles.stagesWrapper}>
            <div
              style={{
                width: `${percentage}%`,
                backgroundColor: `${color}`,
              }}
              className={styles.line}
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

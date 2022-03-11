import styles from "./QuadData.module.scss";
import { QuadDataProps } from "../../types/dataTypes";

const QuadData: React.FC<QuadDataProps> = ({
  isReadiness,
  isSleep,
  isActivity,
  isBedroom,
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
        <span className={styles.quadOneText}>
          {quadOneData} {isBedroom && "°F"}
        </span>
        {isReadiness && <span> bpm</span>}
        {isActivity && <span> Cal</span>}
      </div>
      <div className={styles.quadTwoDataWrapper}>
        <p>{quadTwoText}</p>
        <span className={styles.quadTwoText}>{quadTwoData}</span>
        {isReadiness && <span> ms</span>}
        {isActivity && <span> Cal</span>}
        {isBedroom && <span> %</span>}
      </div>
      <div className={styles.quadThreeDataWrapper}>
        <p>{quadThreeText}</p>
        <span className={styles.quadThreeText}>{quadThreeData} </span>
        {isReadiness && <span>°F</span>}
        {isSleep && <span>%</span>}
        {isActivity && <span> mi</span>}
        {isBedroom && <span>bpm</span>}
      </div>
      <div className={styles.quadFourDataWrapper}>
        <p>{quadFourText}</p>
        <span className={styles.quadFourText}>{quadFourData}</span>{" "}
        {isReadiness && <span>/ min</span>}
        {isSleep && <span>bpm</span>}
        {isBedroom && <span>ms</span>}
      </div>
    </div>
  );
};

export default QuadData;

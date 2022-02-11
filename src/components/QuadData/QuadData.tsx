import styles from "./QuadData.module.scss";

const QuadData = ({
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
}: {
  isReadiness: boolean;
  isSleep: boolean;
  isActivity: boolean;
  isBedroom: boolean;
  quadOneText: string;
  quadOneData: string | number;
  quadTwoText: string;
  quadTwoData: string | number;
  quadThreeText: string;
  quadThreeData: string | number;
  quadFourText: string;
  quadFourData: string | number;
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

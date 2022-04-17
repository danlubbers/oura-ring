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
    <section className={styles.quadDataWrapper}>
      <div className={styles.quadOneDataWrapper}>
        <p data-testid="quad-one-text">{quadOneText}</p>
        <span data-testid="quad-one-data" className={styles.quadOneText}>
          {quadOneData} {isBedroom && "°F"}
        </span>
        {isReadiness && <span> bpm</span>}
        {isActivity && <span> Cal</span>}
      </div>
      <div className={styles.quadTwoDataWrapper}>
        <p data-testid="quad-two-text">{quadTwoText}</p>
        <span data-testid="quad-two-data" className={styles.quadTwoText}>
          {quadTwoData}
          {isReadiness && <span> ms</span>}
          {isActivity && <span> Cal</span>}
          {isBedroom && <span> %</span>}
        </span>
      </div>
      <div className={styles.quadThreeDataWrapper}>
        <p data-testid="quad-three-text">{quadThreeText}</p>
        <span data-testid="quad-three-data" className={styles.quadThreeText}>
          {quadThreeData}
          {isReadiness && <span>°F</span>}
          {isSleep && <span>%</span>}
          {isActivity && <span>mi</span>}
          {isBedroom && <span>bpm</span>}
        </span>
      </div>
      <div className={styles.quadFourDataWrapper}>
        <p data-testid="quad-four-text">{quadFourText}</p>
        <span data-testid="quad-four-data" className={styles.quadFourText}>
          {quadFourData}
          {isReadiness && <span>/ min</span>}
          {isSleep && <span>bpm</span>}
          {isBedroom && <span>ms</span>}
        </span>{" "}
      </div>
    </section>
  );
};

export default QuadData;

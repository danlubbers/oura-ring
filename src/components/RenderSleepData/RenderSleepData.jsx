import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";

const RenderSleepData = ({
  bedtimeStart,
  bedtimeEnd,
  summaryDate,
  lowestHR,
  avgHRData,
}) => {
  return (
    <Container>
      <div className={styles.renderSleepDataContainer}>
        <h1>Last Nights Sleep Data</h1>
        <p className={styles.summaryDate}>{summaryDate}</p>
        <div className={styles.bedtimeDuration}>
          <span>{bedtimeStart} - </span>
          <span>{bedtimeEnd}</span>
        </div>
        <p className={styles.lowestHR}>Lowest Heart Rate: {lowestHR} bpm</p>
        <div className={styles.averageHR}>
          <span className={styles.averageHRText}>
            Average Sleeping Heart Rate:
          </span>
          <span>{Math.round(avgHRData)}</span> <span>bpm</span>
        </div>
        {/* {heartRateData} */}
        {/* {hrvData} */}
      </div>
    </Container>
  );
};

export default RenderSleepData;

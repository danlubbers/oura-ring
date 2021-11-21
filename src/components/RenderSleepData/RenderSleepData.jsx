import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";
import Chart from "../Chart/Chart";

const RenderSleepData = ({
  bedtimeStart,
  bedtimeEnd,
  summaryDate,
  lowestHR,
  avgHRData,
  heartRateData,
  data,
}) => {
  return (
    <Container>
      <div className={styles.renderSleepDataContainer}>
        <h2>Last Nights Sleep Data</h2>
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
      <Chart data={data} />
    </Container>
  );
};

export default RenderSleepData;

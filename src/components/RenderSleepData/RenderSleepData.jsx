import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";
import Chart from "../Chart/Chart";

const RenderSleepData = ({
  bedtimeStart,
  bedtimeEnd,
  summaryDate,
  avgHRData,
  filterOutZeros,
  minHeartRate,
  maxHeartRate,
  maxHRV,
  heartRateDataObj,
  hrvData,
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
        <p className={styles.lowestHR}>Lowest Heart Rate: {minHeartRate} bpm</p>
        <div className={styles.averageHR}>
          <span className={styles.averageHRText}>
            Average Sleeping Heart Rate:
          </span>
          <span>{Math.round(avgHRData)}</span> <span>bpm</span>
        </div>
      </div>
      <Chart
        data={heartRateDataObj}
        dataKey="heartRate"
        chartTitle={"Heart Rate"}
        filterOutZeros={filterOutZeros}
        min={minHeartRate}
        max={maxHeartRate}
        lineColor={"#33becc"}
        legend={false}
      />
      <Chart
        data={hrvData}
        dataKey="HRV"
        chartTitle={"Heart Rate Variability "}
        max={maxHRV}
        lineColor={"#DC143C"}
        legend={false}
      />
    </Container>
  );
};

export default RenderSleepData;

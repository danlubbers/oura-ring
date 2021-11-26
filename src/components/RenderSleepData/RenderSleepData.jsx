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
  avgHRV,
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

        <div className={styles.heartRateTextWrapper}>
          <p className={styles.lowestHR}>
            Lowest Heart Rate: {minHeartRate} bpm
          </p>
          <div className={styles.averageHR}>
            <span className={styles.averageHRText}>Average Heart Rate:</span>
            <span className={styles.averageHRNum}>
              {Math.round(avgHRData)}
            </span>{" "}
            <span>bpm</span>
          </div>
        </div>

        <Chart
          data={heartRateDataObj}
          dataKey="heartRate"
          chartTitle={"Heart Rate"}
          filterOutZeros={filterOutZeros}
          bedtimeStart={bedtimeStart}
          bedtimeEnd={bedtimeEnd}
          min={minHeartRate}
          max={maxHeartRate}
          lineColor={"#33becc"}
          legend={false}
        />
        <div className={styles.hrvTextWrapper}>
          <p className={styles.averageHRV}>Average HRV: {avgHRV} ms</p>
          <div className={styles.maxHRV}>
            <span className={styles.averageHRText}>Max HRV:</span>
            <span className={styles.maxHRVNum}>{Math.round(maxHRV)}</span>{" "}
            <span>ms</span>
          </div>
        </div>
        <Chart
          data={hrvData}
          dataKey="HRV"
          chartTitle={"Heart Rate Variability "}
          bedtimeStart={bedtimeStart}
          bedtimeEnd={bedtimeEnd}
          max={maxHRV}
          lineColor={"#DC143C"}
          legend={false}
        />
      </div>
    </Container>
  );
};

export default RenderSleepData;

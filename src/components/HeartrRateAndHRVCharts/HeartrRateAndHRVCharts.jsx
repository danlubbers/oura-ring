import * as styles from "./HeartrRateAndHRVCharts.module.scss";
import Chart from "../Chart/Chart";

const HeartrRateAndHRVCharts = ({
  // bedtimeStart,
  // bedtimeEnd,
  avgHRData,
  minHeartRate,
  maxHeartRate,
  avgHRV,
  maxHRV,
  heartRateData,
  hrvData,
}) => {
  return (
    <>
      <div className={styles.heartRateTextWrapper}>
        <p className={styles.lowestHRText}>
          Lowest Heart Rate:{" "}
          <span className={styles.lowestHRNum}>{minHeartRate}</span> bpm
        </p>
        <div className={styles.averageHR}>
          <span className={styles.averageHRText}>Avg:</span>
          <span className={styles.averageHRNum}>
            {Math.round(avgHRData) || ""}
          </span>{" "}
          <span>bpm</span>
        </div>
      </div>

      <Chart
        data={heartRateData}
        lineDataKey="heartRate"
        xAxisDataKey="timeDuration"
        chartTitle={"Heart Rate"}
        // bedtimeStart={bedtimeStart}
        // bedtimeEnd={bedtimeEnd}
        yAxisDomain={[minHeartRate - 5, maxHeartRate + 5]}
        lineColor={"#33becc"}
        legend={false}
      />
      <div className={styles.hrvTextWrapper}>
        <div className={styles.maxHRV}>
          <span className={styles.averageHRText}>Max HRV:</span>
          <span className={styles.maxHRVNum}>
            {Math.round(maxHRV) || ""}
          </span>{" "}
          <span>ms</span>
        </div>
        <p className={styles.averageHRV}>Avg: {avgHRV} ms</p>
      </div>
      <Chart
        data={hrvData}
        lineDataKey="HRV"
        xAxisDataKey="timeDuration"
        chartTitle={"Heart Rate Variability"}
        // bedtimeStart={bedtimeStart}
        // bedtimeEnd={bedtimeEnd}
        yAxisDomain={[0, maxHRV + 5]}
        max={maxHRV}
        lineColor={"#DC143C"}
        legend={false}
      />
    </>
  );
};

export default HeartrRateAndHRVCharts;

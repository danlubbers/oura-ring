import styles from "./HeartRateAndHRVCharts.module.scss";
import Chart from "../Chart/Chart";
import { HeartRateAndHRVChartsProps } from "../../types/dataTypes";

const HeartRateAndHRVCharts: React.FC<HeartRateAndHRVChartsProps> = ({
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
        chartTitle={"Heart Rate"}
        data={heartRateData}
        lineDataKey="heartRate"
        xAxisDataKey="timeDuration"
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
        chartTitle={"Heart Rate Variability"}
        data={hrvData}
        lineDataKey="HRV"
        xAxisDataKey="timeDuration"
        yAxisDomain={[0, maxHRV + 5]}
        lineColor={"#DC143C"}
        legend={false}
      />
    </>
  );
};

export default HeartRateAndHRVCharts;

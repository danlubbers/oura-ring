import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";
import Chart from "../Chart/Chart";
import DateRenderer from "../DateRenderer/DateRenderer";

const RenderSleepData = ({
  todaysDate,
  setTodaysData,
  bedtimeStart,
  bedtimeEnd,
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
      <DateRenderer todaysDate={todaysDate} setTodaysData={setTodaysData} />
      <div className={styles.renderSleepDataContainer}>
        <div className={styles.sleepDateWrapper}>
          <h2>Sleep Date: </h2>
          <p className={styles.summaryDate}>{todaysDate}</p>
        </div>
        <div className={styles.bedtimeDuration}>
          <span>{bedtimeStart} - </span>
          <span>{bedtimeEnd}</span>
        </div>

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
          dataKey="HRV"
          chartTitle={"Heart Rate Variability"}
          bedtimeStart={bedtimeStart}
          bedtimeEnd={bedtimeEnd}
          max={maxHRV}
          lineColor={"#DC143C"}
          legend={false}
        />
        <Chart
          data={hrvData}
          dataKey="HRV"
          chartTitle={"Heart Rate Variability"}
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

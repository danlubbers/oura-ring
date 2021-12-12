import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import DateRenderer from "../DateRenderer/DateRenderer";

const RenderReadinessData = ({
  todaysDate,
  setTodaysData,
  score,
  restingHR,
  avgHRV,
  bodyTemp,
  respiratoryRate,
}) => {
  if (!todaysDate) return <Loading />;
  return (
    <Container>
      <DateRenderer
        readiness
        todaysDate={todaysDate}
        setTodaysData={setTodaysData}
      />
      <div className={styles.renderReadinessContainer}>
        <div className={styles.readinessDateWrapper}>
          <h2 className={styles.readinessText}>Readiness Date:</h2>
          <p className={styles.summaryDate}>{todaysDate}</p>
        </div>
        <div className={styles.scoreWrapper}>
          <span>Overall Score:</span>
          <span className={styles.scoreData}>{score} %</span>
        </div>
        <div className={styles.readinessWrapper}>
          <div className={styles.restingHRWrapper}>
            <p>Resting heart rate</p>
            <span className={styles.restingHRData}>{restingHR}</span>
            <span> bpm</span>
          </div>
          <div className={styles.avgHRVWrapper}>
            <p>Heart rate variability</p>
            <span className={styles.avgHRVData}>{avgHRV}</span>
            <span> ms</span>
          </div>
          <div className={styles.bodyTemperatureWrapper}>
            <p>Body Temperature</p>
            <span className={styles.bodyTempData}>{bodyTemp} °F</span>
            <span></span>
          </div>
          <div className={styles.respiratoryRateWrapper}>
            <p>Respiratory rate</p>
            <span className={styles.respiratoryData}>
              {respiratoryRate}
            </span>{" "}
            <span>/ min</span>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RenderReadinessData;

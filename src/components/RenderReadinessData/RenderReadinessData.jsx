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
      <DateRenderer todaysDate={todaysDate} setTodaysData={setTodaysData} />
      <div className={styles.renderReadinessContainer}>
        <div className={styles.readinessDateWrapper}>
          <h2 className={styles.readinessText}>Readiness Date:</h2>
          <p className={styles.summaryDate}>{todaysDate}</p>
        </div>
        <div className={styles.scoreWrapper}>
          <span>Overall Score:</span>
          <span>{score} %</span>
        </div>
        <div className={styles.readinessWrapper}>
          <div className={styles.restingHR}>
            <p>Resting heart rate</p>
            <p>{restingHR} bpm</p>
          </div>
          <div className={styles.avgHRV}>
            <p>Heart rate variability</p>
            <p>{avgHRV} ms</p>
          </div>
          <div className={styles.bodyTemperature}>
            <p>Body Temperature</p>
            <p>{bodyTemp}</p>
          </div>
          <div className={styles.respiratoryRate}>
            <p>Respiratory rate</p>
            <p>{respiratoryRate} / min</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default RenderReadinessData;

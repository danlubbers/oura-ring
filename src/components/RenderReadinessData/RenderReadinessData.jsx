import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import DateRenderer from "../DateRenderer/DateRenderer";

const RenderReadinessData = ({ todaysDate, setTodaysData, score }) => {
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
      </div>
    </Container>
  );
};

export default RenderReadinessData;

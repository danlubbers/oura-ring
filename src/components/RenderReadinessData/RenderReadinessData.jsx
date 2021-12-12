import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import DateRenderer from "../DateRenderer/DateRenderer";
import QuadData from "../QuadData/QuadData";

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

        <QuadData
          quadOneText="Resting heart rate"
          quadOneData={restingHR}
          quadTwoText="Heart rate variability"
          quadTwoData={avgHRV}
          quadThreeText="Body Temperature"
          quadThreeData={bodyTemp}
          quadFourText="Respiratory rate"
          quadFourData={respiratoryRate}
        />
      </div>
    </Container>
  );
};

export default RenderReadinessData;

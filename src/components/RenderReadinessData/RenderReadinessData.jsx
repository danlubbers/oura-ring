import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
// import DateRenderer from "../DateRenderer/DateRenderer";
import QuadData from "../QuadData/QuadData";
import Contributors from "../Contributors/Contributors";

const RenderReadinessData = ({
  todaysDate,
  score,
  restingHR,
  avgHRV,
  bodyTemp,
  respiratoryRate,
  readinessContributorData,
}) => {
  if (!todaysDate) return <Loading />;

  return (
    <Container>
      <QuadData
        readiness
        quadOneText="Resting heart rate"
        quadOneData={restingHR}
        quadTwoText="Heart rate variability"
        quadTwoData={avgHRV}
        quadThreeText="Body Temperature"
        quadThreeData={bodyTemp}
        quadFourText="Respiratory rate"
        quadFourData={respiratoryRate}
      />
      <div className={styles.renderReadinessContainer}>
        <div className={styles.scoreWrapper}>
          <p className={styles.readinessText}>READINESS</p>
          <span className={styles.scoreData}>{score} </span>
          <span>Good</span>
        </div>
        <Contributors
          readinessContributorData={readinessContributorData}
          restingHR={restingHR}
        />
      </div>
    </Container>
  );
};

export default RenderReadinessData;

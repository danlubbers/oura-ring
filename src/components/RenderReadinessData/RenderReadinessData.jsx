import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import Contributors from "../Contributors/Contributors";
import HeartRateAndHRVCharts from "../HeartrRateAndHRVCharts/HeartrRateAndHRVCharts";

const RenderReadinessData = ({
  todaysDate,
  score,
  restingHR,
  avgHRV,
  bodyTemp,
  respiratoryRate,
  bedtimeStart,
  bedtimeEnd,
  avgHRData,
  minHeartRate,
  maxHeartRate,
  maxHRV,
  heartRateData,
  hrvData,
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
        <HeartRateAndHRVCharts
          bedtimeStart={bedtimeStart}
          bedtimeEnd={bedtimeEnd}
          avgHRData={avgHRData}
          minHeartRate={minHeartRate}
          maxHeartRate={maxHeartRate}
          avgHRV={avgHRV}
          maxHRV={maxHRV}
          heartRateData={heartRateData}
          hrvData={hrvData}
        />
      </div>
    </Container>
  );
};

export default RenderReadinessData;

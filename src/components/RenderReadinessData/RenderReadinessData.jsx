import React from "react";
import styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import DailyScore from "../DailyScore/DailyScore";
import Contributors from "../Contributors/Contributors";
import HeartRateAndHRVCharts from "../HeartrRateAndHRVCharts/HeartrRateAndHRVCharts";

const RenderReadinessData = ({
  todaysDate,
  score,
  restingHR,
  avgHRV,
  bodyTemp,
  respiratoryRate,
  // bedtimeStart,
  // bedtimeEnd,
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
    <Container isFooter={true}>
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
        <DailyScore readiness score={score} />

        <Contributors
          readinessContributorData={readinessContributorData}
          restingHR={restingHR}
        />
        <HeartRateAndHRVCharts
          // bedtimeStart={bedtimeStart}
          // bedtimeEnd={bedtimeEnd}
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

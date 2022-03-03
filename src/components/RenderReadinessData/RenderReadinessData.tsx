import styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import DailyScore from "../DailyScore/DailyScore";
import Contributors from "../Contributors/Contributors";
import HeartRateAndHRVCharts from "../HeartRateAndHRVCharts/HeartRateAndHRVCharts";
import { RenderReadinessDataProps } from "../../types/dataTypes";

const RenderReadinessData: React.FC<RenderReadinessDataProps> = ({
  todaysDate,
  score,
  restingHR,
  avgHRV,
  bodyTemp,
  respiratoryRate,
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
        isReadiness
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
        <DailyScore isReadiness score={score} />

        <Contributors
          readinessContributorData={readinessContributorData}
          restingHR={restingHR}
        />
        <HeartRateAndHRVCharts
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

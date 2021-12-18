import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import Contributors from "../Contributors/Contributors";
import HeartRateAndHRVCharts from "../HeartrRateAndHRVCharts/HeartrRateAndHRVCharts";

const RenderSleepData = ({
  todaysDate,
  totalSleep,
  timeInBed,
  sleepEfficiency,
  bedtimeStart,
  bedtimeEnd,
  avgHRData,
  minHeartRate,
  maxHeartRate,
  avgHRV,
  maxHRV,
  heartRateData,
  hrvData,
  sleepContributorData,
}) => {
  if (!todaysDate) return <Loading />;

  return (
    <Container>
      <QuadData
        quadOneText="Total sleep"
        quadOneData={totalSleep}
        quadTwoText="Time in bed"
        quadTwoData={timeInBed}
        quadThreeText="Sleep efficiency"
        quadThreeData={sleepEfficiency}
        quadFourText="Resting heart rate"
        quadFourData={minHeartRate}
      />
      <div className={styles.renderSleepDataContainer}>
        <div className={styles.bedtimeDuration}>
          <span>Sleep duration: </span>
          <span>{bedtimeStart} - </span>
          <span>{bedtimeEnd}</span>
        </div>

        <Contributors
          sleepContributorData={sleepContributorData}
          totalSleep={totalSleep}
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

export default RenderSleepData;

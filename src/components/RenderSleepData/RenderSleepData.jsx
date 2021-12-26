import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import DailyScore from "../DailyScore/DailyScore";
import Contributors from "../Contributors/Contributors";
import BarChart from "../BarChart/BarChart";

import HeartRateAndHRVCharts from "../HeartrRateAndHRVCharts/HeartrRateAndHRVCharts";

const RenderSleepData = ({
  score,
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
  hypnogramData,
  sleepStagesData,
  heartRateData,
  hrvData,
  sleepContributorData,
}) => {
  // console.log(`Render: totalSleep`, totalSleep);
  if (!todaysDate) return <Loading />;

  return (
    <Container>
      <QuadData
        sleep
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
        <DailyScore sleep score={score} />

        <Contributors
          sleepContributorData={sleepContributorData}
          totalSleep={totalSleep}
        />

        <BarChart
          totalSleep={totalSleep}
          timeInBed={timeInBed}
          bedtimeStart={bedtimeStart}
          bedtimeEnd={bedtimeEnd}
          data={hypnogramData}
          sleepStagesData={sleepStagesData}
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

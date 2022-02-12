import styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import DailyScore from "../DailyScore/DailyScore";
import Contributors from "../Contributors/Contributors";
import BarChart from "../BarChart/BarChart";

import HeartRateAndHRVCharts from "../HeartRateAndHRVCharts/HeartRateAndHRVCharts";

const RenderSleepData = ({
  score,
  todaysDate,
  totalSleep,
  timeInBed,
  sleepEfficiency,
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
}: {
  score: number;
  todaysDate: string;
  totalSleep: number;
  timeInBed: string;
  sleepEfficiency: number;
  avgHRData: number;
  minHeartRate: number;
  maxHeartRate: number;
  avgHRV: number;
  maxHRV: number;
  hypnogramData: {
    sleepData: { sleepStage: string; sleepLevel: number };
    timeDuration: string;
  }[];
  sleepStagesData: {
    stage: string;
    seconds: number;
    percentage: number;
    showPercentage: boolean;
    color: string;
  }[];
  heartRateData: { heartRate: number; timeDuration: number }[];
  hrvData: { HRV: number; timeDuration: number }[];
  sleepContributorData: {
    name: string;
    score: number;
    data: number;
    percentage: number;
  }[];
}) => {
  if (!todaysDate) return <Loading />;

  return (
    <Container isFooter={true}>
      <QuadData
        isSleep
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
        <DailyScore isSleep score={score} />

        <Contributors
          sleepContributorData={sleepContributorData}
          totalSleep={totalSleep}
        />

        <BarChart
          isSleep
          totalSleep={totalSleep}
          timeInBed={timeInBed}
          data={hypnogramData}
          dataKey={"sleepData.sleepLevel"}
          XAxisDataKey="timeDuration"
          domain={[1, 4]}
          sleepStagesData={sleepStagesData}
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

export default RenderSleepData;

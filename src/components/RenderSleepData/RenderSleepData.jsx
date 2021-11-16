import * as styles from "./RenderSleepData.module.scss";
import Container from "../Container/Container";

const RenderSleepData = ({
  bedtimeStart,
  bedtimeEnd,
  summaryDate,
  lowestHR,
  avgHRData,
}) => {
  return (
    <Container>
      <div className={styles.renderSleepDataContainer}>
        <h1>Last Nights Sleep Data</h1>
        <p>{summaryDate}</p>
        <span>{bedtimeStart} - </span>
        <span>{bedtimeEnd}</span>
        <p>Lowest Heart Rate: {lowestHR} bpm</p>
        <p>Average Sleeping Heart Rate: {Math.round(avgHRData)} bpm</p>
        {/* {heartRateData} */}
        {/* {hrvData} */}
      </div>
    </Container>
  );
};

export default RenderSleepData;

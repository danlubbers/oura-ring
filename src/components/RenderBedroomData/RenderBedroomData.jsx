import React from "react";
import * as styles from "./RenderBedroomData.module.scss";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import Chart from "../Chart/Chart";

const RenderBedroomData = ({
  bedroomTempAvg,
  bedroomHumidityAvg,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
  chartData,
}) => {
  if (!bedroomTempAvg) return <Loading />;
  return (
    <Container>
      <div className={styles.renderBedroomContainer}>
        <p className={styles.bedroomText}>Ambient Bedroom Stats</p>
        <p className={styles.durationText}>Midnight to 10am</p>
        <div className={styles.tempWrapper}>
          <span>Avg Temperature: </span>
          <span>{bedroomTempAvg}° F</span>
        </div>
        <div className={styles.humidityWrapper}>
          <span>Avg Humidity: </span>
          <span>{bedroomHumidityAvg}%</span>
        </div>
      </div>
      <Chart
        data={chartData}
        lineDataKey={"temp"}
        XAxisDataKey={"time"}
        yAxisDomain={[Math.round(minTemp) - 1, Math.round(maxTemp) + 1]}
      />
      <Chart
        data={chartData}
        lineDataKey={"humidity"}
        XAxisDataKey={"time"}
        yAxisDomain={[Math.round(minHumidity) - 1, Math.round(maxHumidity) + 1]}
      />
    </Container>
  );
};

export default RenderBedroomData;

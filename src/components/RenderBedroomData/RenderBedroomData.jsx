import React from "react";
import * as styles from "./RenderBedroomData.module.scss";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import QuadData from "../QuadData/QuadData";
import Chart from "../Chart/Chart";

const RenderBedroomData = ({
  bedroomTempAvg,
  bedroomHumidityAvg,
  bodyTempData,
  avgHRV,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
  chartData,
}) => {
  if (!bedroomTempAvg) return <Loading />;
  return (
    <Container>
      {/* <div className={styles.renderBedroomContainer}>
        <p className={styles.bedroomText}>Ambient Bedroom Stats</p>
        <p className={styles.durationText}>Midnight to 10am</p>
        <div className={styles.avgTempWrapper}>
          <span>Avg Temperature: </span>
          <span>{bedroomTempAvg}° F</span>
        </div>
        <div className={styles.avgHumidityWrapper}>
          <span>Avg Humidity: </span>
          <span>{bedroomHumidityAvg}%</span>
        </div>
      </div> */}

      <QuadData
        bedroom
        quadOneText="Avg temperature"
        quadOneData={bedroomTempAvg}
        quadTwoText="Avg humidity"
        quadTwoData={bedroomHumidityAvg}
        quadThreeText="Body Temperature"
        quadThreeData={bodyTempData}
        quadFourText="Heart rate variability"
        quadFourData={avgHRV}
      />

      <div className={styles.tempWrapper}>
        <p className={styles.maxTempText}>
          Max temp: <span className={styles.maxTempNum}>{maxTemp} °</span>
        </p>
        <div className={styles.minTemp}>
          <span className={styles.minTempText}>Min temp: </span>
          <span className={styles.minTempNum}>{minTemp} °</span>
        </div>
      </div>
      <Chart
        data={chartData}
        lineDataKey={"temp"}
        xAxisDataKey={"time"}
        yAxisDomain={[Math.round(minTemp) - 1, Math.round(maxTemp) + 1]}
      />

      <div className={styles.humidityWrapper}>
        <p className={styles.maxHumidityText}>
          Max humidity:{" "}
          <span className={styles.maxHumidityNum}>{maxHumidity}%</span>
        </p>
        <div className={styles.minHumidity}>
          <span className={styles.minHumidityText}>Min humidity: </span>
          <span className={styles.minHumidityNum}>{minHumidity}%</span>
        </div>
      </div>
      <Chart
        data={chartData}
        lineDataKey={"humidity"}
        xAxisDataKey={"time"}
        yAxisDomain={[Math.round(minHumidity) - 1, Math.round(maxHumidity) + 1]}
      />
    </Container>
  );
};

export default RenderBedroomData;

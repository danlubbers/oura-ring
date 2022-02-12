import styles from "./RenderBedroomData.module.scss";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import QuadData from "../QuadData/QuadData";
import Chart from "../Chart/Chart";

const RenderBedroomData = ({
  bedroomTempAvg,
  bedroomHumidityAvg,
  restingHR,
  avgHRV,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
  chartData,
}: {
  bedroomTempAvg: number;
  bedroomHumidityAvg: number;
  restingHR: number;
  avgHRV: number;
  minTemp: number;
  maxTemp: number;
  minHumidity: number;
  maxHumidity: number;
  chartData: {
    humidity: string;
    temp: string;
    time: string;
  }[];
}) => {
  if (!bedroomTempAvg) return <Loading isBedroom />;

  return (
    <Container isFooter={true}>
      <QuadData
        isBedroom
        quadOneText="Avg temperature"
        quadOneData={bedroomTempAvg}
        quadTwoText="Avg humidity"
        quadTwoData={bedroomHumidityAvg}
        quadThreeText="Resting heart rate"
        quadThreeData={restingHR}
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
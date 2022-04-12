import styles from "./RenderBedroomData.module.scss";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import QuadData from "../QuadData/QuadData";
import Chart from "../Chart/Chart";
import { RenderBedroomDataProps } from "../../types/dataTypes";

const RenderBedroomData: React.FC<RenderBedroomDataProps> = ({
  bedroomTempAvg,
  bedroomHumidityAvg,
  restingHR,
  avgHRV,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
  chartData,
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
          Max temp:
          <span data-testid="max-temp" className={styles.maxTempNum}>
            {maxTemp} °
          </span>
        </p>
        <div className={styles.minTemp}>
          <span className={styles.minTempText}>Min temp: </span>
          <span data-testid="min-temp" className={styles.minTempNum}>
            {minTemp} °
          </span>
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
          <span data-testid="max-humidity" className={styles.maxHumidityNum}>
            {maxHumidity}%
          </span>
        </p>
        <div className={styles.minHumidity}>
          <span className={styles.minHumidityText}>Min humidity: </span>
          <span data-testid="min-humidity" className={styles.minHumidityNum}>
            {minHumidity}%
          </span>
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

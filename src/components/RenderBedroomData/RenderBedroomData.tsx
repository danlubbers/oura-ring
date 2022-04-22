import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import QuadData from "../QuadData/QuadData";
import MinMaxData from "../MinMaxData/MinMaxData";
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

      <MinMaxData temperature minTemp={minTemp} maxTemp={maxTemp} />

      <Chart
        data={chartData}
        lineDataKey={"temp"}
        xAxisDataKey={"time"}
        yAxisDomain={[Math.round(minTemp) - 1, Math.round(maxTemp) + 1]}
      />

      <MinMaxData
        humidity
        minHumidity={minHumidity}
        maxHumidity={maxHumidity}
      />

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

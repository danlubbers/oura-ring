import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import RenderBedroomData from "./RenderBedroomData";
import mockBedroomData from "../../data/mockData/mockBedroomData.json";

const {
  bedroomTempAvg,
  bedroomHumidityAvg,
  restingHR,
  avgHRV,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
  chartData,
} = mockBedroomData;

const bedroomDataProps = {
  bedroomTempAvg,
  bedroomHumidityAvg,
  restingHR,
  avgHRV,
  minTemp,
  maxTemp,
  minHumidity,
  maxHumidity,
  chartData,
};

const renderComponent = (props) => {
  render(
    <Router>
      <RenderBedroomData {...props} />
    </Router>
  );
};
describe("RenderBedroomData", () => {
  test("should render the correct QuadData", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getByTestId("quad-one")).toHaveTextContent(bedroomTempAvg);
    expect(screen.getByTestId("quad-two")).toHaveTextContent(
      bedroomHumidityAvg
    );
    expect(screen.getByTestId("quad-three")).toHaveTextContent(restingHR);
    expect(screen.getByTestId("quad-four")).toHaveTextContent(avgHRV);
  });

  test("should render the correct Maximum and Minimum Temperatures", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getByTestId("max-temp")).toHaveTextContent(maxTemp);
    expect(screen.getByTestId("min-temp")).toHaveTextContent(minTemp);
  });
  test("should render the correct Maximum and Minimum Humidity", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getByTestId("max-humidity")).toHaveTextContent(maxHumidity);
    expect(screen.getByTestId("min-humidity")).toHaveTextContent(minHumidity);
  });
});

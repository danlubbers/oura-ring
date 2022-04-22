import { prettyDOM, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import RenderBedroomData from "./RenderBedroomData";
import mockBedroomData from "../../data/mockData/mockBedroomData.json";

const {
  avgTemperatureText,
  avgHumidityText,
  restingHRText,
  hrvText,
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
  test("should render the correct QuadText values", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getByTestId("quad-one-text")).toHaveTextContent(
      avgTemperatureText
    );
    expect(screen.getByTestId("quad-two-text")).toHaveTextContent(
      avgHumidityText
    );
    expect(screen.getByTestId("quad-three-text")).toHaveTextContent(
      restingHRText
    );
    expect(screen.getByTestId("quad-four-text")).toHaveTextContent(hrvText);
  });

  test("should render the correct QuadData values", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getByTestId("quad-one-data")).toHaveTextContent(
      `${bedroomTempAvg}°F`
    );
    expect(screen.getByTestId("quad-two-data")).toHaveTextContent(
      `${bedroomHumidityAvg}%`
    );
    expect(screen.getByTestId("quad-three-data")).toHaveTextContent(
      `${restingHR}bpm`
    );
    expect(screen.getByTestId("quad-four-data")).toHaveTextContent(
      `${avgHRV}ms`
    );
  });

  test("should render the correct Maximum and Minimum Temperatures", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getAllByTestId("max-data")[0]).toHaveTextContent(maxTemp);
    expect(screen.getAllByTestId("min-data")[0]).toHaveTextContent(minTemp);
  });

  test("should render the correct Maximum and Minimum Humidity", () => {
    renderComponent(bedroomDataProps);

    expect(screen.getAllByTestId("max-data")[1]).toHaveTextContent(maxHumidity);
    expect(screen.getAllByTestId("min-data")[1]).toHaveTextContent(minHumidity);
  });
});

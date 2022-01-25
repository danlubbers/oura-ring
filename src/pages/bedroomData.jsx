import { useEffect, useState, useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderBedroomData from "../components/RenderBedroomData/RenderBedroomData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import { parseFile } from "../utilities/parseFile";
import { thermoStr } from "../utilities/sampleTempData";

const BedroomData = () => {
  const {
    todaysData: { date, bedtimeStart, bedtimeEnd, data },
  } = useContext(GlobalContext);

  const [parsedCsvData, setParsedCsvData] = useState([]);
  // console.log(`Bedroom: `, data);

  useEffect(() => {
    parseFile(thermoStr, setParsedCsvData);
  }, []);

  const todaysDate = date;

  // Time Data
  let bedtimeHour = bedtimeEnd?.slice(11, 16).split(":")[0];
  const incrementedBedtimeHour = ++bedtimeHour;

  /*** Filtered to get tonights data and hours between midnight and 10am */
  const filteredData = parsedCsvData.filter((obj) => {
    const date = obj.Timestamp.slice(0, 10);
    const hour = obj.Timestamp.slice(11, 13);

    const bedtimeStartDate = bedtimeStart?.slice(0, 10);
    const bedtimeStartTime = bedtimeStart?.slice(11, 13);

    return (
      (date === bedtimeStartDate && hour >= bedtimeStartTime) ||
      (date === todaysDate && hour <= incrementedBedtimeHour)
    );
  });

  // console.log(`filteredData`, filteredData);

  /*** Average Filtered Temp Data */
  const nightlyTempAvg =
    filteredData.reduce(
      (acc, curr) => (acc += Number(curr.Temperature_Fahrenheit)),
      0
    ) / filteredData.length;

  const humidityAvg =
    filteredData.reduce(
      (acc, curr) => (acc += Number(curr.Relative_Humidity)),
      0
    ) / filteredData.length;

  // Quad Data
  const bedroomTempAvg = Number(nightlyTempAvg.toFixed(1));
  const bedroomHumidityAvg = Number(humidityAvg.toFixed(0));
  const restingHR = data?.sleep?.hr_lowest;
  const avgHRV = data?.sleep?.rmssd;
  // Not using Body Temp now - Keep in case for future usage
  // const bodyTempData = data?.sleep?.temperature_delta;
  // const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
  // const bodyTempFahrenheit = (conversionToFahrenheit - 32).toFixed(1);

  const tempArray = filteredData.map((obj) => {
    return Number(obj.Temperature_Fahrenheit);
  });

  const minTemp = Math.min(...tempArray).toFixed(1);
  const maxTemp = Math.max(...tempArray).toFixed(1);

  const humidityArray = filteredData.map((obj) => {
    return Number(obj.Relative_Humidity);
  });

  const minHumidity = Math.min(...humidityArray);
  const maxhumidity = Math.max(...humidityArray);

  const chartData = filteredData.map(
    ({ Relative_Humidity, Temperature_Fahrenheit, Timestamp }) => {
      // console.log("Timestamp", Timestamp);
      const hour = Timestamp.slice(11, 16);
      // console.log("hour", hour);
      return {
        humidity: Relative_Humidity,
        temp: Temperature_Fahrenheit,
        // bedtimeStart: bedtimeStart,
        // bedtimeEnd: null,
        time: hour, // right now hour starts at midnight and goes to bedtimeEndRoundedUp
      };
    }
  );
  // console.log(`chartData`, chartData);

  return (
    <div>
      <DateRenderer />
      <RenderBedroomData
        bedroomTempAvg={bedroomTempAvg}
        bedroomHumidityAvg={bedroomHumidityAvg}
        restingHR={restingHR}
        avgHRV={avgHRV}
        minTemp={minTemp}
        maxTemp={maxTemp}
        minHumidity={minHumidity}
        maxHumidity={maxhumidity}
        chartData={chartData}
      />
      <NavigationFooter />
    </div>
  );
};

export default BedroomData;

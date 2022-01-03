import { useEffect, useState, useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderBedroomData from "../components/RenderBedroomData/RenderBedroomData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import Papa from "papaparse";
import moment from "moment";
import { thermoStr } from "../utilities/sampleTempData";

const BedroomData = () => {
  const {
    todaysData: { date, data },
  } = useContext(GlobalContext);

  const [parsedCsvData, setParsedCsvData] = useState([]);
  // console.log(`Bedroom: `, data);

  useEffect(() => {
    // Converts CSV into JSON
    const parseFile = (file) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setParsedCsvData(results.data);
        },
      });
    };
    parseFile(thermoStr);
  }, []);

  const todaysDate = date;
  // Time Data
  // const timeStart = new Date(data?.sleep?.bedtime_start);
  // const bedtimeStart = moment(timeStart).format("HH:mm");
  const timeEnd = new Date(data?.sleep?.bedtime_end);
  const bedtimeEnd = moment(timeEnd).format("HH:mm");
  // const bedtimeStartRoundedDown = bedtimeStart.split(":")[0] + ":00";
  // console.log(`bedtimeStartRoundedDown`, bedtimeStartRoundedDown);
  const bedtimeEndRoundedUp = ++bedtimeEnd.split(":")[0]; // Round up one hour by incrementing by 1
  // console.log(`bedtimeEndRoundedUp`, bedtimeEndRoundedUp);

  /*** Filtered to get tonights data and hours between midnight and 10am */
  const filteredData = parsedCsvData.filter((obj) => {
    const date = obj.Timestamp.slice(5, 10);
    const hour = obj.Timestamp.slice(11, 13);

    return date === todaysDate && hour <= bedtimeEndRoundedUp;
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
    ({ Relative_Humidity, Temperature_Fahrenheit, Timestamp }, idx) => {
      const hour = Timestamp.slice(11, 16);

      return {
        humidity: Relative_Humidity,
        temp: Temperature_Fahrenheit,
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

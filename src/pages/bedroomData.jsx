import { useEffect, useState, useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderBedroomData from "../components/RenderBedroomData/RenderBedroomData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import Papa from "papaparse";
import { thermoStr } from "../utilities/sampleTempData";

const BedroomData = () => {
  const {
    todaysData: { date, data },
  } = useContext(GlobalContext);

  const [parsedCsvData, setParsedCsvData] = useState([]);
  console.log(`Bedroom: `, data);

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

  /*** Filtered to get tonights data and hours between midnight and 10am */
  const filteredData = parsedCsvData.filter((obj) => {
    const date = obj.Timestamp.slice(5, 10);
    const hour = obj.Timestamp.slice(11, 13);

    return date === todaysDate && hour < 10;
  });

  /*** Average Filtered Temp Data */
  const nightlyTempAvg =
    filteredData.reduce(
      (acc, curr) => (acc += Number(curr.Temperature_Fahrenheit)),
      0
    ) / filteredData.length;

  const bedroomTempAvg = Number(nightlyTempAvg.toFixed(2));

  const humidityAvg =
    filteredData.reduce(
      (acc, curr) => (acc += Number(curr.Relative_Humidity)),
      0
    ) / filteredData.length;

  const bedroomHumidityAvg = Number(humidityAvg.toFixed(0));

  console.log(`filteredData`, filteredData);

  const tempArray = filteredData.map((obj) => {
    return Number(obj.Temperature_Fahrenheit);
  });

  const minTemp = Math.min(...tempArray);
  const maxTemp = Math.max(...tempArray);

  const humidityArray = filteredData.map((obj) => {
    return Number(obj.Relative_Humidity);
  });

  const minHumidity = Math.min(...humidityArray);
  const maxhumidity = Math.max(...humidityArray);

  const chartData = filteredData.map(
    ({ Relative_Humidity, Temperature_Fahrenheit, Timestamp }, idx) => {
      const hour = Timestamp.slice(11, 13);
      return {
        humidity: Relative_Humidity,
        temp: Temperature_Fahrenheit,
        time: hour,
      };
    }
  );

  return (
    <div>
      <DateRenderer />
      <RenderBedroomData
        bedroomTempAvg={bedroomTempAvg}
        bedroomHumidityAvg={bedroomHumidityAvg}
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

import { useEffect, useState, useContext } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderBedroomData from "../components/RenderBedroomData/RenderBedroomData";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { GlobalContext } from "../context/Provider";
import Papa from "papaparse";
import { thermoStr } from "../utilities/sampleTempData";

const BedroomData = () => {
  const { todaysData } = useContext(GlobalContext);
  const [parsedCsvData, setParsedCsvData] = useState([]);

  useEffect(() => {
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

  const todaysDate = todaysData.date;

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

  return (
    <div>
      <DateRenderer />
      <RenderBedroomData
        bedroomTempAvg={bedroomTempAvg}
        bedroomHumidityAvg={bedroomHumidityAvg}
      />
      <NavigationFooter />
    </div>
  );
};

export default BedroomData;

import { useEffect, useState } from "react";
import DateRenderer from "../components/DateRenderer/DateRenderer";
import RenderBedroomData from "../components/RenderBedroomData/RenderBedroomData";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import Papa from "papaparse";
import { thermoStr } from "../utilities/sampleTempData";

const BedroomData = () => {
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
  console.log(`parsedCsvData`, parsedCsvData);

  const tempAvg =
    parsedCsvData.reduce(
      (acc, curr) => (acc += Number(curr.Temperature_Fahrenheit)),
      0
    ) / parsedCsvData.length;
  const bedroomTemp = Number(tempAvg.toFixed(2));

  const humidityAvg =
    parsedCsvData.reduce(
      (acc, curr) => (acc += Number(curr.Relative_Humidity)),
      0
    ) / parsedCsvData.length;

  const bedroomHumidity = Number(humidityAvg.toFixed(0));
  return (
    <div>
      <DateRenderer />
      <RenderBedroomData
        bedroomTemp={bedroomTemp}
        bedroomHumidity={bedroomHumidity}
      />
      <NavigationHeader />
    </div>
  );
};

export default BedroomData;

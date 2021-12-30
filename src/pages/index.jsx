import { useEffect, useState } from "react";
import Home from "../components/Home/Home";
import useToken from "../hooks/useToken";
import NavigationHeader from "../components/NavigationFooter/NavigationFooter";
import Papa from "papaparse";
import { thermoStr } from "../utilities/sampleTempData";

function Index() {
  const { logout } = useToken();
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [bedroomTemp, setBedroomTemp] = useState(null);
  const [bedroomHumidity, setBedroomHumidity] = useState(null);

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

    if (parsedCsvData.length) {
      const tempAvg =
        parsedCsvData.reduce(
          (acc, curr) => (acc += Number(curr.Temperature_Fahrenheit)),
          0
        ) / parsedCsvData.length;
      setBedroomTemp(Number(tempAvg.toFixed(2)));

      const humidityAvg =
        parsedCsvData.reduce(
          (acc, curr) => (acc += Number(curr.Relative_Humidity)),
          0
        ) / parsedCsvData.length;
      setBedroomHumidity(Number(humidityAvg.toFixed(2)));
    }
  }, []);
  // console.log(`parsedCsvData`, parsedCsvData);
  console.log(`bedroomTemp`, bedroomTemp);
  console.log(`bedroomHumidity`, bedroomHumidity);
  return (
    <div>
      <Home bedroomTemp={bedroomTemp} logout={logout} />
      <NavigationHeader />
    </div>
  );
}

export default Index;

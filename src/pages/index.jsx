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
        parsedCsvData
          .map((obj) => {
            return Object.keys(obj)
              .filter((key) => key.includes("Temperature_Fahrenheit"))
              .reduce(
                (cur, key) => Object.assign(cur, { [key]: obj[key] }),
                {}
              );
          })
          .reduce((acc, curr) => acc + Number(curr.Temperature_Fahrenheit), 0) /
        parsedCsvData.length;

      setBedroomTemp(Number(tempAvg.toFixed(2)));
    }
  }, []);
  // console.log(`parsedCsvData`, parsedCsvData);
  console.log(`bedroomTemp`, bedroomTemp);
  return (
    <div>
      <Home logout={logout} />
      <NavigationHeader />
    </div>
  );
}

export default Index;

import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import RenderWeeklyAverages from "../components/RenderWeeklyAverages/RenderWeeklyAverages";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { parseFile } from "../utilities/parseFile";
import { thermoStr } from "../data/sampleTempData";

const WeeklyAverages = () => {
  const {
    sleepData,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isMobileDisplay,
    setIsMobileDisplay,
  } = useContext(GlobalContext);

  const [parsedCsvData, setParsedCsvData] = useState([
    { Timestamp: "", Temperature_Fahrenheit: "", Relative_Humidity: "" },
  ]);
  const [showChartData, setShowChartData] = useState({
    restingHR: true,
    maxHRV: true,
    avgBedroomTemp: true,
    avgHumidity: true,
  });

  useEffect(() => {
    parseFile(thermoStr, setParsedCsvData);
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  const handleClickMobileDisplay = () => {
    setIsMobileDisplay(!isMobileDisplay);
  };

  const handleShowChartData = (chosenData: string) => {
    if ("restingHR" === chosenData) {
      setShowChartData({
        restingHR: !showChartData.restingHR,
        maxHRV: showChartData.maxHRV,
        avgBedroomTemp: showChartData.avgBedroomTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("maxHRV" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        maxHRV: !showChartData.maxHRV,
        avgBedroomTemp: showChartData.avgBedroomTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgBedroomTemp" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        maxHRV: showChartData.maxHRV,
        avgBedroomTemp: !showChartData.avgBedroomTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgHumidity" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        maxHRV: showChartData.maxHRV,
        avgBedroomTemp: showChartData.avgBedroomTemp,
        avgHumidity: !showChartData.avgHumidity,
      });
    }
  };

  const weeklyAverages = sleepData.map((obj) => {
    const date = String(new Date(obj.bedtime_end)).slice(0, 15);

    const monthDayDate = obj.bedtime_end.slice(5, 10);

    const bodyTempData = obj.temperature_delta;
    const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
    let bodyTempFahrenheit = (conversionToFahrenheit - 32).toFixed(1);
    // Add a '+' to indicate higher temp since there is a '-' natively in the api
    bodyTempFahrenheit = !bodyTempFahrenheit.includes("-")
      ? `+${bodyTempFahrenheit}`
      : bodyTempFahrenheit;

    const getAverage = (arr: string[]) => {
      const reducer = (acc: number, val: string) => acc + Number(val);
      const sum = arr.reduce(reducer, 0);
      return sum / arr.length;
    };

    const filteredTempAvg = parsedCsvData
      .filter((e) => {
        const hour = Number(e.Timestamp.slice(11, 13));
        return (
          date === String(new Date(e.Timestamp)).slice(0, 15) && hour <= 10
        );
      })
      .map((e) => e.Temperature_Fahrenheit);

    const avgTemp = Number(getAverage(filteredTempAvg).toFixed(1));

    const filteredHumidityAvg = parsedCsvData
      .filter((e) => {
        const hour = Number(e.Timestamp.slice(11, 13));
        return (
          date === String(new Date(e.Timestamp)).slice(0, 15) && hour <= 10
        );
      })
      .map((e) => e.Relative_Humidity);

    const avgHumidity = Number(getAverage(filteredHumidityAvg).toFixed(1));

    return {
      restingHR: obj.hr_lowest,
      maxHRV: obj.rmssd,
      bodyTemp: parseFloat(bodyTempFahrenheit),
      avgBedroomTemp: avgTemp,
      avgHumidity: avgHumidity,
      fullDate: date,
      date: monthDayDate,
    };
  });

  const chosenDateRange = weeklyAverages.filter((obj) => {
    // Had to convert the dates to ISO standards for filtering range
    const ISOStartDate =
      startDate && new Date(startDate).toISOString().slice(0, 10);
    console.log("ISOStartDate", ISOStartDate);

    const ISOEndDate = endDate && new Date(endDate).toISOString();

    const ISODate = new Date(obj.fullDate).toISOString().slice(0, 10);

    return ISODate >= ISOStartDate && ISODate <= ISOEndDate;
  });

  return (
    <div>
      <RenderWeeklyAverages
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        showChartData={showChartData}
        handleShowChartData={handleShowChartData}
        weeklyAverages={weeklyAverages}
        chosenDateRange={chosenDateRange}
        isMobileDisplay={isMobileDisplay}
        handleClickMobileDisplay={handleClickMobileDisplay}
      />
      <NavigationFooter />
    </div>
  );
};

export default WeeklyAverages;

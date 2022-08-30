import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import RenderWeeklyAverages from "../components/RenderWeeklyAverages/RenderWeeklyAverages";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { parseFile } from "../utilities/parseFile";
import { thermoStr } from "../data/sampleTempData";
import { getAverages } from "../utilities/getAverages";
import { filterAverages } from "../utilities/filterAverages";

const WeeklyAverages = () => {
  const {
    sleepPeriodData,
    dailySleepData,
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
    avgHRV: true,
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
        avgHRV: showChartData.avgHRV,
        avgBedroomTemp: showChartData.avgBedroomTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgHRV" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        avgHRV: !showChartData.avgHRV,
        avgBedroomTemp: showChartData.avgBedroomTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgBedroomTemp" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        avgHRV: showChartData.avgHRV,
        avgBedroomTemp: !showChartData.avgBedroomTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgHumidity" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        avgHRV: showChartData.avgHRV,
        avgBedroomTemp: showChartData.avgBedroomTemp,
        avgHumidity: !showChartData.avgHumidity,
      });
    }
  };

  const weeklyAverages = sleepPeriodData.map((obj) => {
    const date = String(new Date(obj.bedtime_end)).slice(0, 15);

    const monthDayDate = obj.bedtime_end.slice(5, 10);

    const bodyTempData = 89; /*** THIS IS DUMMY DATA - FIGURE OUT HOW TO GET bodyTEMP back in here since V2 broke it */
    const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
    let bodyTempFahrenheit = (conversionToFahrenheit - 32).toFixed(1);
    // Add a '+' to indicate higher temp since there is a '-' natively in the api
    bodyTempFahrenheit = !bodyTempFahrenheit.includes("-")
      ? `+${bodyTempFahrenheit}`
      : bodyTempFahrenheit;

    const filteredTempAvg = filterAverages(parsedCsvData, date, "temperature");
    const avgTemp = Number(getAverages(filteredTempAvg).toFixed(1));

    const filteredHumidityAvg = filterAverages(parsedCsvData, date, "humidity");
    const avgHumidity = Number(getAverages(filteredHumidityAvg).toFixed(1));

    return {
      restingHR: obj.lowest_heart_rate,
      avgHRV: obj.average_hrv,
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

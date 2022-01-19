import React, { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import RenderWeeklyAverages from "../components/RenderWeeklyAverages/RenderWeeklyAverages";
import NavigationFooter from "../components/NavigationFooter/NavigationFooter";
import { parseFile } from "../utilities/parseFile";
import { thermoStr } from "../utilities/sampleTempData";

const WeeklyAverages = () => {
  const { sleepData, isMobileDisplay, setIsMobileDisplay } =
    useContext(GlobalContext);
  // console.log(`sleepData`, sleepData);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [showChartData, setShowChartData] = useState({
    restingHR: true,
    maxHRV: true,
    avgBedroomTemp: true,
    avgHumidity: true,
  });

  // console.log(`startDate`, startDate);
  // console.log(`endDate`, endDate);

  useEffect(() => {
    parseFile(thermoStr, setParsedCsvData);
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  const handleClickMobileDisplay = () => {
    setIsMobileDisplay(!isMobileDisplay);
  };

  const handleShowChartData = (chosenData) => {
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
  // console.log(`showChartData`, showChartData);

  // console.log(`parsedCsvData`, parsedCsvData);

  const weeklyAverages = sleepData.map((obj, idx) => {
    // console.log(`obj.bedtime_end`, obj.bedtime_end);
    const date = String(new Date(obj.bedtime_end)).slice(0, 15);
    // const dateObj = new Date(obj.bedtime_end);
    // console.log(`dateObj`, dateObj);
    const monthDayDate = obj.bedtime_end.slice(5, 10);

    const bodyTempData = obj.temperature_delta;
    const conversionToFahrenheit = (bodyTempData * 9) / 5 + 32;
    let bodyTempFahrenheit = (conversionToFahrenheit - 32).toFixed(1);
    // Add a '+' to indicate higher temp since there is a '-' natively in the api
    bodyTempFahrenheit = !bodyTempFahrenheit.includes("-")
      ? `+${bodyTempFahrenheit}`
      : bodyTempFahrenheit;

    const getAverage = (arr) => {
      const reducer = (acc, val) => acc + Number(val);
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
    // console.log(`avgTemp`, avgTemp);

    const filteredHumidityAvg = parsedCsvData
      .filter((e) => {
        const hour = Number(e.Timestamp.slice(11, 13));
        return (
          date === String(new Date(e.Timestamp)).slice(0, 15) && hour <= 10
        );
      })
      .map((e) => e.Relative_Humidity);

    const avgHumidity = Number(getAverage(filteredHumidityAvg).toFixed(1));
    // console.log(`avgHumidity`, avgHumidity);

    return {
      restingHR: obj.hr_lowest,
      maxHRV: obj.rmssd,
      bodyTemp: bodyTempFahrenheit,
      avgBedroomTemp: avgTemp,
      avgHumidity: avgHumidity,
      fullDate: date,
      date: monthDayDate,
    };
  });

  // console.log(`weeklyAverages`, weeklyAverages);

  const chosenDateRange = weeklyAverages.filter((obj, idx) => {
    // Had to convert the dates to ISO standards for filtering range
    const ISOStartDate =
      startDate && new Date(startDate).toISOString().slice(0, 10);
    const ISOEndDate = endDate && new Date(endDate).toISOString().slice(0, 10);

    const ISODate = new Date(obj.fullDate).toISOString().slice(0, 10);

    return ISODate >= ISOStartDate && ISODate <= ISOEndDate;
  });

  console.log(`chosenDateRange`, chosenDateRange);

  return (
    <div>
      <RenderWeeklyAverages
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        showChartData={showChartData}
        handleShowChartData={handleShowChartData}
        weeklyAverages={weeklyAverages}
        isMobileDisplay={isMobileDisplay}
        setIsMobileDisplay={setIsMobileDisplay}
        handleClickMobileDisplay={handleClickMobileDisplay}
      />
      <NavigationFooter />
    </div>
  );
};

export default WeeklyAverages;

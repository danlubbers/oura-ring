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
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const [showChartData, setShowChartData] = useState({
    restingHR: true,
    maxHRV: true,
    avgTemp: true,
    avgHumidity: true,
  });

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
        avgTemp: showChartData.avgTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("maxHRV" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        maxHRV: !showChartData.maxHRV,
        avgTemp: showChartData.avgTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgTemp" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        maxHRV: showChartData.maxHRV,
        avgTemp: !showChartData.avgTemp,
        avgHumidity: showChartData.avgHumidity,
      });
    }
    if ("avgHumidity" === chosenData) {
      setShowChartData({
        restingHR: showChartData.restingHR,
        maxHRV: showChartData.maxHRV,
        avgTemp: showChartData.avgTemp,
        avgHumidity: !showChartData.avgHumidity,
      });
    }
  };
  // console.log(`showChartData`, showChartData);

  // console.log(`parsedCsvData`, parsedCsvData);

  const weeklyAverages = sleepData.map((obj, idx) => {
    const date = obj.bedtime_end.slice(5, 10);

    const getAverage = (arr) => {
      const reducer = (acc, val) => acc + Number(val);
      const sum = arr.reduce(reducer, 0);
      return sum / arr.length;
    };

    const filteredTempAvg = parsedCsvData
      .filter((e) => {
        const hour = Number(e.Timestamp.slice(11, 13));
        return date === e.Timestamp.slice(5, 10) && hour <= 10;
      })
      .map((e) => e.Temperature_Fahrenheit);

    const avgTemp = Number(getAverage(filteredTempAvg).toFixed(1));
    // console.log(`avgTemp`, avgTemp);

    const filteredHumidityAvg = parsedCsvData
      .filter((e) => {
        const hour = Number(e.Timestamp.slice(11, 13));
        return date === e.Timestamp.slice(5, 10) && hour <= 10;
      })
      .map((e) => e.Relative_Humidity);

    const avgHumidity = Number(getAverage(filteredHumidityAvg).toFixed(1));
    // console.log(`avgHumidity`, avgHumidity);

    return {
      restingHR: obj.hr_lowest,
      maxHRV: obj.rmssd,
      avgTemp: avgTemp,
      avgHumidity: avgHumidity,
      date: date,
    };
  });

  // console.log(`weeklyAverages`, weeklyAverages);

  return (
    <div>
      <RenderWeeklyAverages
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

import React from "react";
import * as styles from "./RenderWeeklyAverages.module.scss";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import WeeklyAveragesChart from "../WeeklyAveragesChart/WeeklyAveragesChart";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";

const RenderWeeklyAverages = ({
  showChartData,
  handleShowChartData,
  weeklyAverages,
  isMobileDisplay,
  handleClickMobileDisplay,
}) => {
  if (!weeklyAverages[0]) return <Loading />;

  const renderWeeklyAverages = weeklyAverages.map((obj, idx) => {
    return (
      <div key={`${idx}`} className={styles.weeklyAveragesContainer}>
        <p className={styles.dateText}>Date: {obj.date}</p>
        <div className={styles.averagesWrapper}>
          <span>Lowest heart rate: </span>
          <span className={`${styles.renderedData} ${styles.restingHRData}`}>
            {obj.restingHR} bpm
          </span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Max HRV: </span>
          <span className={`${styles.renderedData} ${styles.maxHRVData}`}>
            {obj.maxHRV} ms
          </span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Ambient Bedroom Temp: </span>
          <span className={`${styles.renderedData} ${styles.avgTempData}`}>
            {obj.avgTemp} °F
          </span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Ambient Humidity: </span>
          <span
            className={`${styles.renderedData} ${styles.avgHumidityHRData}`}
          >
            {obj.avgHumidity} %
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
      <Container isFooter={true}>
        <HamburgerIcon
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
        />

        <p className={styles.weeklyAveragesText}>Weekly Averages</p>

        <div className={styles.pickData}>
          <button
            className={`${styles.xAxisData} ${styles.restingHRBtn}`}
            onClick={() => handleShowChartData("restingHR")}
          >
            Resting HR
          </button>
          <button
            className={`${styles.xAxisData} ${styles.maxHRVBtn}`}
            onClick={() => handleShowChartData("maxHRV")}
          >
            Max HRV
          </button>
          <button
            className={`${styles.xAxisData} ${styles.avgTempBtn}`}
            onClick={() => handleShowChartData("avgTemp")}
          >
            Room temp
          </button>
          <button
            className={`${styles.xAxisData} ${styles.avgHumidityBtn}`}
            onClick={() => handleShowChartData("avgHumidity")}
          >
            Humidity
          </button>
        </div>

        <WeeklyAveragesChart
          data={weeklyAverages}
          showChartData={showChartData}
        />
        {renderWeeklyAverages}
      </Container>

      <SideMenu
        handleClickMobileDisplay={handleClickMobileDisplay}
        isMobileDisplay={isMobileDisplay}
      />
    </>
  );
};

export default RenderWeeklyAverages;

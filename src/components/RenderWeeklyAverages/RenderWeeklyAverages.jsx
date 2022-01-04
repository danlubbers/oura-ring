import React, { useContext, useEffect } from "react";
import * as styles from "./RenderWeeklyAverages.module.scss";
import { GlobalContext } from "../../context/Provider";
import Container from "../Container/Container";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend } from "recharts";

const RenderWeeklyAverages = ({ weeklyAverages }) => {
  const { isMobileDisplay, setIsMobileDisplay } = useContext(GlobalContext);

  useEffect(() => {
    setIsMobileDisplay(false);
  }, [setIsMobileDisplay]);

  const handleClickMobileDisplay = () => {
    console.log("hit");
    setIsMobileDisplay(!isMobileDisplay);
  };

  const renderWeeklyAverages = weeklyAverages.map((obj, idx) => {
    // console.log(`obj`, obj);
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
        <div className={styles.chartContainer}>
          <LineChart
            width={340}
            height={350}
            data={weeklyAverages}
            margin={{
              top: 5,
              right: 20,
              left: -35,
              bottom: 5,
            }}
          >
            <Line
              type="monotone"
              dataKey="restingHR"
              stroke="#dc143c"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="maxHRV"
              stroke="#808080"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="avgTemp"
              stroke="#303ead"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="avgHumidity"
              stroke="#33becc"
              dot={false}
            />

            <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              interval="preserveStartEnd"
              style={{
                fontSize: "1.5rem",
              }}
            />
            <YAxis
              style={{
                fontSize: "1.1rem",
              }}
            />

            <Legend
              wrapperStyle={{
                position: "relative",
                fontSize: "1.2rem",
                marginLeft: "34px",
              }}
            />
          </LineChart>
        </div>
        {renderWeeklyAverages}
      </Container>
      <div
        className={
          !isMobileDisplay
            ? `${styles.sidebarContainer}`
            : `${styles.sidebarContainer} ${styles.active}`
        }
      >
        <SideMenu
          handleClickMobileDisplay={handleClickMobileDisplay}
          isMobileDisplay={isMobileDisplay}
        />
      </div>
    </>
  );
};

export default RenderWeeklyAverages;

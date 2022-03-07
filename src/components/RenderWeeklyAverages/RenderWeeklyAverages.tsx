import styles from "./RenderWeeklyAverages.module.scss";
import Loading from "../Loading/Loading";
import Container from "../Container/Container";
import PickDateRange from "../PickDateRange/PickDateRange";
import WeeklyAveragesChart from "../WeeklyAveragesChart/WeeklyAveragesChart";
import HamburgerIcon from "../HamburgerIcon/HamburgerIcon";
import SideMenu from "../SideMenu/SideMenu";
import { RenderWeeklyAveragesProps } from "../../types/dataTypes";

const RenderWeeklyAverages: React.FC<RenderWeeklyAveragesProps> = ({
  setStartDate,
  setEndDate,
  showChartData,
  handleShowChartData,
  weeklyAverages,
  chosenDateRange,
  isMobileDisplay,
  handleClickMobileDisplay,
}) => {
  if (!weeklyAverages[0]) return <Loading />;

  const renderWeeklyAverages = chosenDateRange.map((obj, idx) => {
    return (
      <div key={`${idx}`} className={styles.weeklyAveragesContainer}>
        <p className={styles.dateText}>{obj.fullDate}</p>
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
          <span>Body Temp Deviation: </span>
          <span className={`${styles.renderedData} ${styles.bodyTempData}`}>
            {obj.bodyTemp} °F
          </span>
        </div>
        <div className={styles.averagesWrapper}>
          <span>Ambient Bedroom Temp: </span>
          <span
            className={`${styles.renderedData} ${styles.avgBedroomTempData}`}
          >
            {obj.avgBedroomTemp} °F
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

        <PickDateRange
          weeklyAverages={weeklyAverages}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <div className={styles.pickData}>
          <button
            className={
              showChartData.restingHR
                ? `${styles.xAxisData} ${styles.restingHRBtnActive}`
                : `${styles.xAxisData} ${styles.restingHRBtnInactive}`
            }
            type="button"
            onClick={() => handleShowChartData("restingHR")}
          >
            Resting HR
          </button>
          <button
            className={
              showChartData.maxHRV
                ? `${styles.xAxisData} ${styles.maxHRVBtnActive}`
                : `${styles.xAxisData} ${styles.maxHRVBtnInactive}`
            }
            type="button"
            onClick={() => handleShowChartData("maxHRV")}
          >
            Max HRV
          </button>
          <button
            className={
              showChartData.avgBedroomTemp
                ? `${styles.xAxisData} ${styles.avgBedroomTempBtnActive}`
                : `${styles.xAxisData} ${styles.avgBedroomTempBtnInactive}`
            }
            type="button"
            onClick={() => handleShowChartData("avgBedroomTemp")}
          >
            Room Temp
          </button>
          <button
            className={
              showChartData.avgHumidity
                ? `${styles.xAxisData} ${styles.avgHumidityBtnActive}`
                : `${styles.xAxisData} ${styles.avgHumidityBtnInactive}`
            }
            type="button"
            onClick={() => handleShowChartData("avgHumidity")}
          >
            Humidity
          </button>
        </div>

        <WeeklyAveragesChart
          data={chosenDateRange}
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

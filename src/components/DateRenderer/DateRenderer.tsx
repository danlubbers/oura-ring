import { useContext, useRef, createRef, useEffect } from "react";
import styles from "./DateRenderer.module.scss";
import Button from "../Button/Button";
import { GlobalContext } from "../../context/Provider";
import { findDataByDate } from "../../utilities/findDatabyDate";

const DateRenderer = () => {
  const {
    readinessData,
    dailySleepData,
    activityData,
    mergedHeartRateData,
    mergedTagData,
    mergedSessionData,
    sleepPeriodData,
    mergedWorkoutData,
    todaysData,
    setTodaysData,
    btnOffsetLeft,
    setBtnOffsetLeft,
    isBtnPosition,
    setIsBtnPosition,
  } = useContext(GlobalContext);

  const dateRendererRef = useRef<HTMLDivElement>(null);
  const lastBtnRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<{ current: HTMLDivElement }[]>([]);

  // https://stackoverflow.com/questions/65350114/useref-for-element-in-loop-in-react
  btnRefs.current = sleepPeriodData.map((_, idx) => {
    return btnRefs.current[idx] ?? createRef();
  });

  const todaysDate = todaysData?.date;

  useEffect(() => {
    if (isBtnPosition) {
      lastBtnRef?.current?.scrollIntoView();
    }
    if (!isBtnPosition) {
      dateRendererRef?.current?.scrollTo({ left: btnOffsetLeft });
    }
  }, [todaysDate, btnOffsetLeft, isBtnPosition]);

  const pickSleepDate = sleepPeriodData.map((sleepObj, idx) => {
    const date = sleepObj.day;
    const bedtimeStart = sleepObj.bedtime_start;
    const bedtimeEnd = sleepObj.bedtime_end;

    const combinedData = {
      readiness: findDataByDate(readinessData, date),
      dailySleep: findDataByDate(dailySleepData, date),
      activity: findDataByDate(activityData, date),
      heartRate: findDataByDate(mergedHeartRateData, date),
      tags: findDataByDate(mergedTagData, date),
      sessions: findDataByDate(mergedSessionData, date),
      sleepPeriod: sleepPeriodData[idx],
      workouts: findDataByDate(mergedWorkoutData, date),
    };

    const handleBtnClick = () => {
      setTodaysData({
        date,
        bedtimeStart,
        bedtimeEnd,
        data: combinedData,
      });

      setBtnOffsetLeft(btnRefs?.current[idx]?.current.offsetLeft - 167.5);
      setIsBtnPosition(btnRefs?.current[idx] ? false : true); // conditional added because the last btn is always undefined
    };

    return (
      <div
        key={`btn${idx}: ${date}`}
        style={{ width: "100%" }}
        ref={lastBtnRef}
      >
        <Button
          btnAction={date.slice(5, 10)} // month, day
          type="button"
          onClick={handleBtnClick}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            margin: "0 1rem",
            borderRadius: "50%",
            backgroundColor: todaysDate === date && "#66becc",
          }}
          ref={btnRefs.current[idx]}
        />
      </div>
    );
  });

  return (
    <div className={styles.dateRendererContainer} ref={dateRendererRef}>
      {pickSleepDate}
    </div>
  );
};

export default DateRenderer;

import { useContext, useRef, createRef, useEffect } from "react";
import * as styles from "./DateRenderer.module.scss";
import Button from "../Button/Button";
import { GlobalContext } from "../../context/Provider";

const DateRenderer = () => {
  const {
    readinessData,
    sleepData,
    activityData,
    todaysData,
    setTodaysData,
    btnOffsetLeft,
    setBtnOffsetLeft,
    isBtnPosition,
    setIsBtnPosition,
  } = useContext(GlobalContext);

  const dateRendererRef = useRef();
  const lastBtnRef = useRef();

  // https://stackoverflow.com/questions/65350114/useref-for-element-in-loop-in-react
  let btnRefs = useRef([]);
  btnRefs.current = sleepData.map((_, idx) => {
    return btnRefs.current[idx] ?? createRef();
  });

  const todaysDate = todaysData?.date;
  console.log("todaysDate", todaysDate);

  useEffect(() => {
    if (isBtnPosition) {
      lastBtnRef?.current?.scrollIntoView();
    }
    if (!isBtnPosition) {
      dateRendererRef?.current?.scrollTo({ left: btnOffsetLeft });
    }
  }, [todaysDate, btnOffsetLeft, isBtnPosition]);

  const pickSleepDate = sleepData.map((sleepObj, idx) => {
    const combinedData = {
      readiness: readinessData[idx],
      sleep: sleepData[idx],
      activity: activityData[++idx], // ++ increment 1 due to needing todays activity, not previous like readiness and sleep data
    };

    const date = sleepObj.bedtime_end.slice(0, 10); // year, month, day

    const handleBtnClick = () => {
      setTodaysData({
        date,
        data: combinedData,
      });
      setBtnOffsetLeft(btnRefs?.current[idx]?.current.offsetLeft - 167.5);
      setIsBtnPosition(btnRefs?.current[idx] ? false : true); // conditional added because the last btn is always undefined
    };

    return (
      <div key={`btn: ${date}`} style={{ width: "100%" }} ref={lastBtnRef}>
        <Button
          btnAction={date.slice(5, 10)} // month, day
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

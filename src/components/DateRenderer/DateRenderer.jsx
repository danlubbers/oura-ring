import React, { useContext, useCallback, useRef, useEffect } from "react";
import * as styles from "./DateRenderer.module.scss";
import Button from "../Button/Button";
import { GlobalContext } from "../../context/Provider";

const DateRenderer = () => {
  const { readinessData, sleepData, activityData, todaysData, setTodaysData } =
    useContext(GlobalContext);

  const todaysDate = todaysData?.date;

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef?.current?.scrollIntoView();
  }, [todaysDate]); // this triggers to go to most recent date on load, but creates another bug when user selects different date. Right now it always scrolls no matter what to the end. Need to target the specific date instead.

  const pickSleepDate = sleepData.map((sleepObj, idx) => {
    const combinedData = {
      readiness: readinessData[idx],
      sleep: sleepData[idx],
      activity: activityData[++idx], // ++ increment 1 due to needing todays activity, not previous like readiness and sleep data
    };

    const date = sleepObj.bedtime_end.slice(5, 10);

    // const scrollDate = scrollRef?.current?.outerText;
    // console.log(`scrollDate`, scrollDate);
    // const scrollWidth = scrollRef?.current?.offsetLeft;
    // console.log(`scrollWidth`, scrollWidth);
    // window.scrollTo({
    //   left: scrollWidth,
    //   behavior: "smooth",
    // });

    return (
      <div key={`btn: ${date}`} style={{ width: "100%" }} ref={scrollRef}>
        <Button
          btnAction={date}
          onClick={() =>
            setTodaysData({
              date,
              data: combinedData,
            })
          }
          style={{
            width: "3.5rem",
            height: "3.5rem",
            margin: "0 1rem",
            borderRadius: "50%",
            backgroundColor: todaysDate === date && "#66becc",
          }}
        />
      </div>
    );
  });

  return <div className={styles.dateRendererContainer}>{pickSleepDate}</div>;
};

export default DateRenderer;

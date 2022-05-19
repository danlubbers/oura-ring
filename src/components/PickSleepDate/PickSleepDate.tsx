import { RefObject, useContext, useEffect, useState } from "react";
import Button from "../Button/Button";
import { GlobalContext } from "../../context/Provider";

const PickSleepDate = ({
  btnRefs,
  lastBtnRef,
}: {
  btnRefs: { current: { current: HTMLDivElement }[] };
  lastBtnRef: RefObject<HTMLDivElement>;
}) => {
  const {
    readinessData,
    sleepData,
    activityData,
    tagData,
    todaysData,
    setTodaysData,
    setBtnOffsetLeft,
    setIsBtnPosition,
  } = useContext(GlobalContext);

  console.log("lastBtnRef", lastBtnRef);

  const [filteredTags, setFilteredTags] = useState<any>([]);
  console.log("State: filteredtags", filteredTags);

  const todaysDate = todaysData?.date;

  useEffect(
    () =>
      setFilteredTags(
        tagData.filter(({ day }: { day: string }) => {
          return day === todaysDate;
        })
      ),
    [tagData, todaysDate]
  );
  console.log("#1 - filteredTagsMemo", filteredTags);

  const pickSleepDate = sleepData.map((sleepObj, idx) => {
    const date = sleepObj.bedtime_end.slice(0, 10); // year, month, day
    const bedtimeStart = sleepObj.bedtime_start;
    const bedtimeEnd = sleepObj.bedtime_end;

    const combinedData = {
      readiness: readinessData[idx],
      sleep: sleepData[idx],
      activity: activityData[++idx], // ++ increment 1 due to needing todays activity, not previous like readiness and sleep data
      tags: filteredTags,
    };

    const handleBtnClick = () => {
      console.log("#2 - BTN CLICK: filterTags - ", filteredTags);
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
      <div key={`btn: ${date}`} style={{ width: "100%" }} ref={lastBtnRef}>
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
  return <>{pickSleepDate}</>;
};

export default PickSleepDate;

import { useContext, useRef, createRef, useEffect } from "react";
import styles from "./DateRenderer.module.scss";
import { GlobalContext } from "../../context/Provider";
import PickSleepDate from "../PickSleepDate/PickSleepDate";

const DateRenderer = () => {
  const { sleepData, todaysData, btnOffsetLeft, isBtnPosition } =
    useContext(GlobalContext);

  const dateRendererRef = useRef<HTMLDivElement>(null);
  const lastBtnRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<{ current: HTMLDivElement }[]>([]);

  // https://stackoverflow.com/questions/65350114/useref-for-element-in-loop-in-react
  btnRefs.current = sleepData.map((_, idx) => {
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

  return (
    <div className={styles.dateRendererContainer} ref={dateRendererRef}>
      <PickSleepDate btnRefs={btnRefs} lastBtnRef={lastBtnRef} />
    </div>
  );
};

export default DateRenderer;

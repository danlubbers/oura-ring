import { useContext } from "react";
import styles from "./ButtonToggle.module.scss";
import { GlobalContext } from "../../context/Provider";

const ButtonToggle = () => {
  const {
    todaysData: { date, bedtimeStart, bedtimeEnd, hadVividDreams, data },
    setTodaysData,
  } = useContext(GlobalContext);

  const handleToggle = () => {
    setTodaysData({
      date,
      bedtimeStart,
      bedtimeEnd,
      hadVividDreams: !hadVividDreams,
      data,
    });
  };
  return (
    <div className={styles.buttonToggleContainer}>
      <p>Vivid Dreams:</p>
      <div
        className={`${hadVividDreams ? styles.toggle : styles.toggleChecked}`}
        onClick={handleToggle}
      >
        <div className={styles.toggleContainer}>
          <div className={styles.toggleUncheck}>
            <span className={styles.circleNo}></span>
          </div>
          <div className={styles.toggleCheck}>
            <span className={styles.circleYes}></span>
          </div>
        </div>
      </div>
      <input
        className={styles.toggleInput}
        type="checkbox"
        aria-label="Toggle Button"
      />
    </div>
  );
};

export default ButtonToggle;

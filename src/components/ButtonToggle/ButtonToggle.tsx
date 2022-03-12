import { useState } from "react";
import styles from "./ButtonToggle.module.scss";

const ButtonToggle = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggle = () => {
    console.log("isToggled", isToggled);

    setIsToggled(!isToggled);
  };
  return (
    <div className={styles.buttonToggleContainer}>
      <p>Vivid Dreams:</p>
      <div
        className={`${isToggled ? styles.toggleChecked : styles.toggle}`}
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

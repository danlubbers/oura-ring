import React from "react";
import * as styles from "./Button.module.scss";

const Button = ({ btnAction, btnType, onClick }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button type={btnType} className={styles.button} onClick={onClick}>
        {btnAction}
      </button>
    </div>
  );
};

export default Button;

import React from "react";
import * as styles from "./Button.module.scss";

const Button = ({ btnAction }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button className={styles.button}>{btnAction}</button>
    </div>
  );
};

export default Button;

import React from "react";
import * as styles from "./Container.module.scss";

const Container = ({ children, isFooter }) => {
  console.log(`isFooter`, isFooter);
  return (
    <div
      className={
        isFooter
          ? `${styles.container}`
          : `${styles.container} ${styles.noFooter}`
      }
    >
      {children}
    </div>
  );
};

export default Container;

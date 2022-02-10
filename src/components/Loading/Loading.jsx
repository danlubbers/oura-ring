import React from "react";
import styles from "./Loading.module.scss";
const Loading = ({ bedroom }) => {
  return (
    <div className={styles.loadingContainer}>
      {bedroom ? (
        <p className={styles.bedroomDataMissingText}>
          Bedroom data appears to be missing...
        </p>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Loading;

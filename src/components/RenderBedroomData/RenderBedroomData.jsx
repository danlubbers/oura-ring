import React from "react";
import * as styles from "/RenderBedroomData.module.scss";

const RenderBedroomData = ({ bedroomTemp }) => {
  return (
    <div className={styles.renderBedroomContainer}>
      <h1>
        <span>Temperature: </span>
        <span>{bedroomTemp}</span>
      </h1>
    </div>
  );
};

export default RenderBedroomData;

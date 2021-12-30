import React from "react";
import * as styles from "./RenderBedroomData.module.scss";
// import Loading from "../Loading/Loading";
import Container from "../Container/Container";

const RenderBedroomData = ({ bedroomTemp, bedroomHumidity }) => {
  // if (!bedroomTemp) return <Loading />;
  return (
    <Container>
      <div className={styles.renderBedroomContainer}>
        <div className={styles.tempWrapper}>
          <span>Temperature: </span>
          <span>{bedroomTemp}° F</span>
        </div>
        <div className={styles.humidityWrapper}>
          <span>Humidity: </span>
          <span>{bedroomHumidity}%</span>
        </div>
      </div>
    </Container>
  );
};

export default RenderBedroomData;

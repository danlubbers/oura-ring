import React from "react";
import * as styles from "./RenderBedroomData.module.scss";
// import Loading from "../Loading/Loading";
import Container from "../Container/Container";

const RenderBedroomData = ({ bedroomTempAvg, bedroomHumidityAvg }) => {
  // if (!bedroomTemp) return <Loading />;
  return (
    <Container>
      <div className={styles.renderBedroomContainer}>
        <p className={styles.bedroomText}>Ambient Bedroom Stats</p>
        <p className={styles.durationText}>Midnight to 10am</p>
        <div className={styles.tempWrapper}>
          <span>Temperature: </span>
          <span>{bedroomTempAvg}° F</span>
        </div>
        <div className={styles.humidityWrapper}>
          <span>Humidity: </span>
          <span>{bedroomHumidityAvg}%</span>
        </div>
      </div>
    </Container>
  );
};

export default RenderBedroomData;

import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";

const RenderReadinessData = ({ summaryDate, score }) => {
  return (
    <Container>
      <div className={styles.renderReadinessContainer}>
        <h1 className={styles.readinessText}>Readiness Data:</h1>
        <p className={styles.summaryDate}>{summaryDate}</p>
        <div className={styles.scoreWrapper}>
          <span>Overall Score:</span>
          <span>{score}</span>
        </div>
      </div>
    </Container>
  );
};

export default RenderReadinessData;

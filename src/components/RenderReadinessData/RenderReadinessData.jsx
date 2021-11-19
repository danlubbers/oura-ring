import React from "react";
import * as styles from "./RenderReadinessData.module.scss";
import Container from "../Container/Container";

const RenderReadinessData = ({ summaryDate }) => {
  return (
    <Container>
      <div className={styles.renderReadinessContainer}>
        <h1>Readiness Data:</h1>
        <p>{summaryDate}</p>
      </div>
    </Container>
  );
};

export default RenderReadinessData;

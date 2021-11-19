import React, { useContext, useState } from "react";
import RenderReadinessData from "../components/RenderReadinessData/RenderReadinessData";
import { GlobalContext } from "../context/Provider";

function Readiness() {
  const { ouraData } = useContext(GlobalContext);
  const readinessData = ouraData?.ouraReadinessData?.data?.readiness;
  const todaysReadiness = readinessData?.[readinessData.length - 1];
  console.log(`todaysReadiness`, todaysReadiness);
  const summaryDate = todaysReadiness?.summary_date;
  console.log(`summaryDate`, summaryDate);

  return (
    <div>
      <RenderReadinessData summaryDate={summaryDate} />
    </div>
  );
}

export default Readiness;

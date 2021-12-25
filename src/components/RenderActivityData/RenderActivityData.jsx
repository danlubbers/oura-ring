import * as styles from "./RenderActivityData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";

const RenderActivityData = ({ todaysDate }) => {
  // console.log(`Render: totalSleep`, totalSleep);
  if (!todaysDate) return <Loading />;

  return (
    <Container>
      ACTIVITY TEST
      <QuadData
      // quadOneText="Total sleep"
      // quadOneData={totalSleep}
      // quadTwoText="Time in bed"
      // quadTwoData={timeInBed}
      // quadThreeText="Sleep efficiency"
      // quadThreeData={sleepEfficiency}
      // quadFourText="Resting heart rate"
      // quadFourData={minHeartRate}
      />
    </Container>
  );
};

export default RenderActivityData;

// import * as styles from "./RenderActivityData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";

const RenderActivityData = ({
  todaysDate,
  calActive,
  calTotal,
  walkingEquivalency,
  steps,
}) => {
  // console.log(`Render: totalSleep`, totalSleep);
  if (!todaysDate) return <Loading />;

  return (
    <Container>
      <QuadData
        activity
        quadOneText="Active calories"
        quadOneData={calActive}
        quadTwoText="Total burn"
        quadTwoData={calTotal}
        quadThreeText="Walking equivalency"
        quadThreeData={walkingEquivalency}
        quadFourText="Steps"
        quadFourData={steps}
      />
    </Container>
  );
};

export default RenderActivityData;

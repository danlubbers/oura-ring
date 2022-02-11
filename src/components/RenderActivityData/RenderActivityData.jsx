import styles from "./RenderActivityData.module.scss";
import Container from "../Container/Container";
import Loading from "../Loading/Loading";
import QuadData from "../QuadData/QuadData";
import DailyScore from "../DailyScore/DailyScore";
import Contributors from "../Contributors/Contributors";
import BarChart from "../BarChart/BarChart";

const RenderActivityData = ({
  score,
  todaysDate,
  calActive,
  calTotal,
  walkingEquivalency,
  steps,
  activityContributorData,
  metFiveMinArray,
  activityStagesData,
}) => {
  // console.log(`Render: totalSleep`, totalSleep);
  if (!todaysDate) return <Loading />;

  return (
    <Container isFooter={true}>
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
      <div className={styles.renderActivityContainer}>
        <DailyScore activity score={score} />

        <Contributors activityContributorData={activityContributorData} />
      </div>
      <div className={styles.dailyMovementContainer}>
        <p>Daily movement</p>
        <BarChart
          isActivity
          data={metFiveMinArray}
          dataKey="met"
          XAxisDataKey={"index"}
          domain={[0, 4]}
          activityStagesData={activityStagesData}
        />
      </div>
    </Container>
  );
};

export default RenderActivityData;

import axios from "axios";

const getOuraData = async () => {
  // V2 Endpoints
  const ouraActivityBaseURL = `http://localhost:8080/activity`;
  const ouraReadinessBaseURL = `http://localhost:8080/readiness`;
  const ouraSleepBaseURL = `http://localhost:8080/sleep`;
  const ouraHeartRateBaseURL = `http://localhost:8080/heartrate`;
  const ouraPersonalInfoBaseURL = `http://localhost:8080/personal_info`;
  const ouraSessionsBaseURL = `http://localhost:8080/sessions`;
  const ouraTagBaseURL = `http://localhost:8080/tags`;
  const ouraWorkoutsBaseURL = `http://localhost:8080/workouts`;

  try {
    const ouraActivityData_V2 = await axios.get(ouraActivityBaseURL);
    const ouraReadinessData_V2 = await axios.get(ouraReadinessBaseURL);
    const ouraSleepData_V2 = await axios.get(ouraSleepBaseURL);
    const ouraHeartRateData_V2 = await axios.get(ouraHeartRateBaseURL);
    const ouraPersonalInfoData_V2 = await axios.get(ouraPersonalInfoBaseURL);
    const ouraSessionsData_V2 = await axios.get(ouraSessionsBaseURL);
    const ouraTagData_V2 = await axios.get(ouraTagBaseURL);
    const ouraWorkoutsData_V2 = await axios.get(ouraWorkoutsBaseURL);

    return {
      ouraActivityData_V2,
      ouraReadinessData_V2,
      ouraSleepData_V2,
      ouraHeartRateData_V2,
      ouraPersonalInfoData_V2,
      ouraSessionsData_V2,
      ouraTagData_V2,
      ouraWorkoutsData_V2,
    };
  } catch (error) {
    console.error(error);
  }
};
export default getOuraData;

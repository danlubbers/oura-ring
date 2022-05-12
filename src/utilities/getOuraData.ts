import axios from "axios";

const getOuraData = async () => {
  const ouraToken = process.env.REACT_APP_OURA_TOKEN;

  const headerConfig = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${ouraToken}`,
  };

  // V1 Endpoints
  const ouraUserInfoBaseURL = `https://api.ouraring.com/v1/userinfo`;
  const ouraReadinessBaseURL = `https://api.ouraring.com/v1/readiness?start=2021-12-24`;
  const ouraSleepBaseURL = `https://api.ouraring.com/v1/sleep?start=2021-12-24`;
  const ouraActivityBaseURL = `https://api.ouraring.com/v1/activity?start=2021-12-24`;

  // V2 Endpoints
  const ouraHeartRateBaseURL = `http://localhost:8080/heartrate`;
  const ouraPersonalInfoBaseURL = `http://localhost:8080/personal_info`;
  const ouraSessionsBaseURL = `http://localhost:8080/sessions`;
  const ouraTagBaseURL = `http://localhost:8080/tags`;
  const ouraWorkoutsBaseURL = `http://localhost:8080/workouts`;

  try {
    const ouraUserData = await axios.get(ouraUserInfoBaseURL, {
      headers: headerConfig,
    });
    const ouraReadinessData = await axios.get(ouraReadinessBaseURL, {
      headers: headerConfig,
    });
    const ouraSleepData = await axios.get(ouraSleepBaseURL, {
      headers: headerConfig,
    });
    const ouraActivityData = await axios.get(ouraActivityBaseURL, {
      headers: headerConfig,
    });
    const ouraHeartRateData_V2 = await axios.get(ouraHeartRateBaseURL);
    const ouraPersonalInfoData_V2 = await axios.get(ouraPersonalInfoBaseURL);
    const ouraSessionsData_V2 = await axios.get(ouraSessionsBaseURL);
    const ouraTagData_V2 = await axios.get(ouraTagBaseURL);
    const ouraWorkoutsData_V2 = await axios.get(ouraWorkoutsBaseURL);

    return {
      ouraUserData,
      ouraReadinessData,
      ouraSleepData,
      ouraActivityData,
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

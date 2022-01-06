import axios from "axios";

const getOuraData = async () => {
  const ouraToken = process.env.REACT_APP_OURA_TOKEN;
  const ouraUserInfoAPI = `https://api.ouraring.com/v1/userinfo?access_token=${ouraToken}`;
  const ouraReadinessAPI = `https://api.ouraring.com/v1/readiness?start=2021-12-24&access_token=${ouraToken}`;
  const ouraSleepAPI = `https://api.ouraring.com/v1/sleep?start=2021-12-24&access_token=${ouraToken}`;
  const ouraActivityAPI = `https://api.ouraring.com/v1/activity?start=2021-12-24&access_token=${ouraToken}`;
  try {
    const ouraUserData = await axios.get(ouraUserInfoAPI);
    const ouraReadinessData = await axios.get(ouraReadinessAPI);
    const ouraSleepData = await axios.get(ouraSleepAPI);
    const ouraActivityData = await axios.get(ouraActivityAPI);

    return { ouraUserData, ouraReadinessData, ouraSleepData, ouraActivityData };
  } catch (error) {
    console.error(error);
  }
};
export default getOuraData;

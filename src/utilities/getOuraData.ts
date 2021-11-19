import axios from "axios";

const getOuraData = async () => {
  const ouraToken = process.env.REACT_APP_OURA_TOKEN;
  const ouraUserInfoAPI = `https://api.ouraring.com/v1/userinfo?access_token=${ouraToken}`;
  const ouraReadinessAPI = `https://api.ouraring.com/v1/readiness?access_token=${ouraToken}`;
  const ouraSleepAPI = `https://api.ouraring.com/v1/sleep?access_token=${ouraToken}`;
  try {
    const ouraUserData = await axios.get(ouraUserInfoAPI);
    const ouraReadinessData = await axios.get(ouraReadinessAPI);
    const ouraSleepData = await axios.get(ouraSleepAPI);

    return { ouraUserData, ouraReadinessData, ouraSleepData };
  } catch (error) {
    console.error(error);
  }
};
export default getOuraData;

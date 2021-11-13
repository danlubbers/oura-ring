import axios from "axios";

const getOuraData = async () => {
  const ouraToken = process.env.REACT_APP_OURA_TOKEN;
  const ouraUserInfoAPI = `https://api.ouraring.com/v1/userinfo?access_token=${ouraToken}`;
  const ouraSleepAPI = `https://api.ouraring.com/v1/sleep?access_token=${ouraToken}`;
  try {
    const ouraUserData = await axios.get(ouraUserInfoAPI);
    const ouraSleepData = await axios.get(ouraSleepAPI);

    return { ouraUserData, ouraSleepData };
  } catch (error) {
    console.error(error);
  }
};
export default getOuraData;

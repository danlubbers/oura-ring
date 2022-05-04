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
  const ouraTagsV2BaseURL = `https://api.ouraring.com/v2/usercollection/tag?start_date=2021-12-24&end_date=2022-04-27`;

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
    // const ouraTagsData = await axios.get(ouraTagsV2BaseURL, {
    //   headers: headerConfig,
    // });
    // console.log("ouraTagsData", ouraTagsData);

    return {
      ouraUserData,
      ouraReadinessData,
      ouraSleepData,
      ouraActivityData,
      // ouraTagsData,
    };
  } catch (error) {
    console.error(error);
  }
};
export default getOuraData;

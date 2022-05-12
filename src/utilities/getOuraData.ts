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
  const ouraTagBaseURL = `http://localhost:8080/tags`;

  // const getEndpoints = async (
  //   baseURL: string,
  //   headerConfig: {
  //     Accept: string;
  //     "Content-Type": string;
  //     Authorization: string;
  //   }
  // ) => {
  //   await axios.get(baseURL, { headers: headerConfig });
  // };

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
    console.log("ouraSleepData", ouraSleepData);
    const ouraActivityData = await axios.get(ouraActivityBaseURL, {
      headers: headerConfig,
    });
    // const ouraTagData = await axios.get(ouraTagBaseURL);
    // console.log("ouraTagData", ouraTagData);

    return {
      ouraUserData,
      ouraReadinessData,
      ouraSleepData,
      ouraActivityData,
      // ouraTagData,
    };
  } catch (error) {
    console.error(error);
  }
};
export default getOuraData;

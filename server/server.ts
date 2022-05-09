const dotenv = require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const ouraToken = process.env.REACT_APP_OURA_TOKEN;
const port = 8080;
const baseURLV2 = `https://api.ouraring.com/v2/usercollection/`;
const headerConfig = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${ouraToken}`,
};

// V2 Endpoints
const ouraHeartRateV2BaseURL = `${baseURLV2}heartrate?start_date=2021-12-24`;
const ouraPersonalInfoV2BaseURL = `${baseURLV2}personal_info?start_date=2021-12-24`;
const ouraSessionsV2BaseURL = `${baseURLV2}session?start_date=2021-12-24`;
const ouraTagsV2BaseURL = `${baseURLV2}tag?start_date=2021-12-24`;
const ouraWorkoutssV2BaseURL = `${baseURLV2}workout?start_date=2021-12-24`;

const getEndpoint = async (route: string, baseURL: string) => {
  await app.get(
    route,
    async (
      req: any,
      res: {
        status: (arg0: number) => {
          (): any;
          new (): any;
          json: {
            (arg0: { data?: any; message?: string; error?: unknown }): void;
            new (): any;
          };
        };
      }
    ) => {
      try {
        const data = await axios
          .get(baseURL, {
            headers: headerConfig,
          })
          .then((res: { data: any }) => res.data);
        res.status(200).json({
          data,
        });
      } catch (error) {
        res.status(400).json({ message: `*** Error Occured ***`, error });
      }
    }
  );
};

getEndpoint("/heartrate", ouraHeartRateV2BaseURL);
getEndpoint("/personal_info", ouraPersonalInfoV2BaseURL);
getEndpoint("/sessions", ouraSessionsV2BaseURL);
getEndpoint("/tags", ouraTagsV2BaseURL);
getEndpoint("/workouts", ouraWorkoutssV2BaseURL);

app.use(
  "/login",
  (req: any, res: { send: (arg0: { token: string }) => void }) => {
    res.send({ token: "test456" });
  }
);

app.listen(port, () => console.log(`SERVER is running on PORT: ${port}`));

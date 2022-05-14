import dotenv from "dotenv";
import axios from "axios";
import express from "express";
import cors from "cors";
const app = express();

dotenv.config();
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
const ouraPersonalInfoV2BaseURL = `${baseURLV2}personal_info`;
const ouraSessionsV2BaseURL = `${baseURLV2}session?start_date=2021-12-24`;
const ouraTagsV2BaseURL = `${baseURLV2}tag?start_date=2021-12-24`;
const ouraWorkoutssV2BaseURL = `${baseURLV2}workout?start_date=2021-12-24`;

const getEndpoint = (route, baseURL, keyName, personalInfo) => {
  app.get(route, async (req, res) => {
    try {
      if (personalInfo) {
        const data = await axios
          .get(baseURL, {
            headers: headerConfig,
          })
          .then((res) => res.data);
        res.status(200).json({
          [keyName]: data,
        });
        console.log("personal_info", data);
      } else {
        const { data } = await axios
          .get(baseURL, {
            headers: headerConfig,
          })
          .then((res) => res.data);
        res.status(200).json({
          [keyName]: data,
        });
        console.log("data", data);
      }
    } catch (error) {
      res.status(400).json({ message: `*** Error Occured ***`, error });
    }
  });
};

getEndpoint("/heartrate", ouraHeartRateV2BaseURL, "heartRate");
getEndpoint("/personal_info", ouraPersonalInfoV2BaseURL, "personalInfo", true);
getEndpoint("/sessions", ouraSessionsV2BaseURL, "sessions");
getEndpoint("/tags", ouraTagsV2BaseURL, "tags");
getEndpoint("/workouts", ouraWorkoutssV2BaseURL, "workouts");

app.use("/login", (req, res) => {
  res.send({ token: "test456" });
});

app.listen(port, () => console.log(`SERVER is running on PORT: ${port}`));

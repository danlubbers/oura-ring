require("dotenv").config();
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
const ouraHeartRateV2BaseURL = `${baseURLV2}heartrate?start_date=2022-04-01`;
const ouraPersonalInfoV2BaseURL = `${baseURLV2}personal_info?start_date=2022-04-01`;
const ouraSessionsV2BaseURL = `${baseURLV2}session?start_date=2022-04-01`;
const ouraTagsV2BaseURL = `${baseURLV2}tag?start_date=2022-04-01`;
const ouraWorkoutssV2BaseURL = `${baseURLV2}workout?start_date=2022-04-01`;

app.get("/heartrate", async (req, res) => {
  try {
    const data = await axios
      .get(ouraHeartRateV2BaseURL, {
        headers: headerConfig,
      })
      .then((res) => res.data);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({ message: `***Error Occured***`, error });
  }
});
app.get("/personal_info", async (req, res) => {
  try {
    const data = await axios
      .get(ouraPersonalInfoV2BaseURL, {
        headers: headerConfig,
      })
      .then((res) => res.data);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({ message: `***Error Occured***`, error });
  }
});

app.get("/sessions", async (req, res) => {
  try {
    const data = await axios
      .get(ouraSessionsV2BaseURL, {
        headers: headerConfig,
      })
      .then((res) => res.data);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({ message: `***Error Occured***`, error });
  }
});

app.get("/tags", async (req, res) => {
  try {
    const data = await axios
      .get(ouraTagsV2BaseURL, {
        headers: headerConfig,
      })
      .then((res) => res.data);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({ message: `***Error Occured***`, error });
  }
});

app.get("/workouts", async (req, res) => {
  try {
    const data = await axios
      .get(ouraWorkoutssV2BaseURL, {
        headers: headerConfig,
      })
      .then((res) => res.data);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).json({ message: `***Error Occured***`, error });
  }
});

app.use("/login", (req, res) => {
  res.send({ token: "test456" });
});

app.listen(port, () => console.log(`SERVER is running on PORT: ${port}`));

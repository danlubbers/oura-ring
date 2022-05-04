require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();

const ouraToken = process.env.REACT_APP_OURA_TOKEN;

const baseURL = `https://api.ouraring.com/v2/usercollection/`;

const headerConfig = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${ouraToken}`,
};

// V2 Endpoints
const ouraTagsV2BaseURL = `${baseURL}tag?start_date=2021-12-24`;

const ouraTagsData = axios
  .get(ouraTagsV2BaseURL, {
    headers: headerConfig,
  })
  .then((res) => console.log(res.data));

// console.log("ouraTagsData", ouraTagsData);

app.use(cors());

app.use("/login", (req, res) => {
  res.send({ token: "test456" });
});

const port = 8080;

app.listen(port, () => console.log(`SERVER is running on PORT: ${port}`));

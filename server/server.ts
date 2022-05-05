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
const ouraTagsV2BaseURL = `${baseURLV2}tag?start_date=2022-04-01`;

app.get("/tags", async (req, res) => {
  try {
    const tags = await axios
      .get(ouraTagsV2BaseURL, {
        headers: headerConfig,
      })
      .then((res) => res.data);
    res.status(200).json({
      tagData: tags,
    });
  } catch (error) {
    res.status(400).json({ message: `Error Occured`, error });
  }
});

app.use("/login", (req, res) => {
  res.send({ token: "test456" });
});

app.listen(port, () => console.log(`SERVER is running on PORT: ${port}`));

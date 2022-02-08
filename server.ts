const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/login", (req, res) => {
  res.send({ token: "test456" });
});

const port = 8080;

app.listen(port, () => console.log(`SERVER is running on PORT: ${port}`));

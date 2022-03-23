const express = require("express");
const config = require("./config/app");

const app = express();
const PORT = config.appPort;

app.get("/home", (req, res) => {
  return res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

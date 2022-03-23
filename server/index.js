const express = require("express");
const config = require("./config/app");
const router = require("./router");

const app = express();
const PORT = config.appPort;

app.use(express.urlencoded({ extended: true })); // Images
app.use(express.json()); // JSON Data from client
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

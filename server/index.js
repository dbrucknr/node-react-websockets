const express = require("express");
const config = require("./config/app");
const router = require("./router");
const cors = require("cors");

const app = express();
const PORT = config.appPort;

app.use(express.urlencoded({ extended: true })); // Images
app.use(express.json()); // JSON Data from client
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

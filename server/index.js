const express = require("express");
const app = express();

const PORT = 3000;

app.get("/home", (req, res) => {
  return res.send("Home");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

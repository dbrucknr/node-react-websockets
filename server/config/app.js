require("dotenv").config();

// const secret = require("crypto").randomBytes(64).toString("hex"); // Generate App Key

module.exports = {
  appKey: process.env.APP_KEY,
  appPort: process.env.APP_PORT,
  appUrl: process.env.APP_URL,
};

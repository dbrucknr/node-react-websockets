const router = require("express").Router();

router.get("/login", (req, res) => {
  return res.send("Login");
});

router.get("/register", (req, res) => {
  return res.send("Register");
});

module.exports = router;

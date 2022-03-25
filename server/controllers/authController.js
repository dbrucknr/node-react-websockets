const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/app");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Step 1: Find User
    const user = await User.findOne({
      where: {
        email,
      },
    });

    // Step 2: Check if User is found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Step 3: Check if Password Matches
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    // Step 4: Generate Auth Token
    const userWithToken = generateToken(user.get({ raw: true }));
    userWithToken.avatar = user.avatar;

    return res.send(userWithToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    //   I may want to check to see if a user already exists
    const user = await User.create(req.body);

    const userWithToken = generateToken(user.get({ raw: true }));
    return res.send(userWithToken);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const generateToken = (user) => {
  delete user.password;

  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 });
  return { ...user, ...{ token } };
};

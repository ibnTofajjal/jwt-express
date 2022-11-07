const User = require("../models/user");
const jwt = require("jsonwebtoken");

const token = async (req, res) => {
  const accessToken = jwt.sign(
    {
      email: "test@mail.com",
    },
    process.env.SECRET_ACCESS_KEY,
    { expiresIn: process.env.ACCESS_TOKE_EXPIRY }
  );
  res.send(accessToken);
};

const test = async (req, res) => {
  try {
    const newUser = new User({
      email: "Joynal2@test.com",
      password: "test",
      emailConfirmed: false,
      emailToken: "test",
      security: {
        tokens: null,
        passwordReset: null,
      },
    });

    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { test, token };

const User = require("../models/user");

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

module.exports = { test };

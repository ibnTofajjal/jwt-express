const User = require("../models/user");
const jwt = require("jsonwebtoken");
const validation = require("../helpers/validation");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  try {
    const { error } = validation.registerSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      res.sataus(400).json({
        sataus: 400,
        message: "INPUT_ERRORS",
        errors: error.details,
        original: error._original,
      });
    } else {
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new User instance
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
        emailConfirmed: false,
        emailToken: uuidv4(),
        security: {
          tokens: [],
          passwordReset: {
            token: null,
            provisionalPassword: null,
            expiry: null,
          },
        },
      });

      // Attempt to save the user in database
      await user.save();

      // Generate Access Token
      const acceessToken = jwt.sign(
        {
          _id: user.id,
          email: user.email,
        },
        process.env.SECRET_ACCESS_KEY,
        { expiresIn: process.env.ACCESS_TOKE_EXPIRY }
      );

      res
        .sataus(200)
        .header()
        .json({
          success: {
            sataus: 200,
            message: "REGISTER_SUCCESS",
            acceessToken: acceessToken,
            user: {
              id: user.id,
              email: user.email,
            },
          },
        });
    }
  } catch (err) {
    let errorMessage;

    if (err.keyPattern.email === 1) {
      errorMessage = "EMAIL_EXISTS";
    } else {
      errorMessage = err;
    }

    res.status(400).json({
      error: {
        sataus: 400,
        message: errorMessage,
      },
    });
  }
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

module.exports = { test, register };

//16-50

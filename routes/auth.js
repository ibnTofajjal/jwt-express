const express = require("express");
const authControllers = require("../controllers/auth");

//API Middleware
const rateLimiter = require("../helpers/rateLimiter");
const verifyToken = require("../helpers/verifyToken");

// Router initialisation
const router = express.Router();

// Routes
router.get("/test", [rateLimiter(10, 10), verifyToken], authControllers.test);

// Post register
router.post("/register", authControllers.register);

// Post Token
router.post("/token", authControllers.token);

module.exports = router;

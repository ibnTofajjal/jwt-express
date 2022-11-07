const express = require("express");
const authControllers = require("../controllers/auth");

//API Middleware
const rateLimiter = require("../helpers/rateLimiter");
const verifyToken = require("../helpers/verifyToken");

// Router initialisation
const router = express.Router();

// Routes
router.get("/test", [rateLimiter(10, 10), verifyToken], authControllers.test);

router.post("/token", authControllers.token);

module.exports = router;

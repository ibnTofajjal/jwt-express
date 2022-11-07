const express = require("express");
const authControllers = require("../controllers/auth");
const rateLimiter = require("../helpers/rateLimiter");

// Router initialisation
const router = express.Router();

// Routes
router.get("/test", rateLimiter(1, 10), authControllers.test);

module.exports = router;

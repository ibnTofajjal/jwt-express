const express = require("express");
const authControllers = require("../controllers/auth");

// Router initialisation
const router = express.Router();

// Routes
router.get("/test", authControllers.test);

module.exports = router;

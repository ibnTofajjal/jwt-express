const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const authControllers = require("./controllers/auth");

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");

// Declere API category endpoints
app.use("/api/auth", authRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("API Listening to Port: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (token) {
      try {
        req.user = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        next();
      } catch (error) {
        res.status(401).json({ error: 401, message: "INVALID_TOKEN" });
      }
    } else {
      res
        .status(400)
        .json({ error: { status: 400, message: "ACCESS_DENIED" } });
    }
  } catch (error) {
    res.status(400).json({ error: { status: 400, message: "ACCESS_DENIED" } });
  }
};

module.exports = auth;

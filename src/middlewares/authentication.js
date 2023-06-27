const { UnauthorizedError } = require("../utils/errorHandler.js");

const debug = require("debug")("app:authentication");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const rawToken = req.headers.authorization;
  const token = rawToken?.replace("Bearer", "").trim();
  debug("token:", token);
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);
    if (!user) {
      res.status(401).send("Invalid token");
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    next(new UnauthorizedError(error.message));
  }
};

module.exports = isAuthenticated;

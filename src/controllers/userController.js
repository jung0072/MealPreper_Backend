const debug = require("debug")("app:userController");

const UserService = require("../services/userService");

const getUserData = async (req, res, next) => {
  debug("getUserData");
  try {
    const userData = await UserService.getUserData(req.user);
    debug("userData", userData);

    res.json({ data: userData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserData,
};

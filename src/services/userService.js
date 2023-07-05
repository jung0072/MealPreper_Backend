const debug = require("debug")("app:userService");
const { NotFoundError, BadRequestError } = require("../utils/errorHandler");

const User = require("../models/userModel");
const Recipe = require("../models/recipeModel");

const getUserData = async (userId) => {
    debug("getUserData");
    const user = await User.findById(userId);
    const recipes = await Recipe.find({ userId: userId });
    return { user, recipes };
};

module.exports = {
  getUserData,
};

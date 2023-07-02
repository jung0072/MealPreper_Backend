const debug = require("debug")("app:recipeService");
const { NotFoundError, BadRequestError } = require("../utils/errorHandler");

const Recipe = require("../models/recipeModel");

const getAllRecipe = async () => {
  debug("getAllRecipe");
  const recipe = await Recipe.find({})
  return recipe;
};

const createRecipe = async (ownerId, recipe) => {
  debug("createRecipe");
  const newRecipe = new Recipe({
    ...recipe,
    ownerID: ownerId,
    createdAt: new Date(),
  });
  await newRecipe.save();
  return newRecipe;
};


module.exports = {
  getAllRecipe,
  createRecipe,
};

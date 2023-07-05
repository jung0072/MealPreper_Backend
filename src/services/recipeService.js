const debug = require("debug")("app:recipeService");
const { NotFoundError, BadRequestError } = require("../utils/errorHandler");

const Recipe = require("../models/recipeModel");

const getAllRecipe = async () => {
  debug("getAllRecipe");
  const recipe = await Recipe.find({});
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

const getRecipe = async (id) => {
  debug("getRecipe");
  const recipe = await Recipe.find({ _id: id });
  return recipe;
};

const updateRecipe = async (id, recipe) => {
  debug("updateRecipe");
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { ...recipe, updatedAt: new Date() },
    { new: true }
  );
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
  debug("deleteRecipe");
  const deletedRecipe = await Recipe.findByIdAndDelete(id);

  if (!deletedRecipe) {
    throw new NotFoundError("Recipe not found");
  }
};

module.exports = {
  getAllRecipe,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};

const debug = require("debug")("app:recipeController");

const RecipeService = require("../services/recipeService");

const getAllRecipe = async (req, res, next) => {
  debug("getAllRecipe");
  try {
    const recipe = await RecipeService.getAllRecipe();
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  debug("createRecipe");
  debug(req.body);
  try {
    debug(req.user);
    const ownerId = req.user._id;
    const recipe = await RecipeService.createRecipe(ownerId, req.body);
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  debug("getRecipe");
  try {
    const recipe = await RecipeService.getRecipe(req.params.id);
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  debug("updateRecipe");
  try {
    const recipe = await RecipeService.updateRecipe(req.params.id, req.body);
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  debug("deleteRecipe", req.params.id);
  try {    
    const recipe = await RecipeService.deleteRecipe(req.params.id);
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllRecipe,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};

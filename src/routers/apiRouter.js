const { Router } = require("express");
const RecipeController = require("../controllers/recipeController.js");

const RecipeRouter = Router();

RecipeRouter.get("/allRecipe", RecipeController.getAllRecipe);
RecipeRouter.post("/createRecipe", RecipeController.createRecipe);

module.exports = RecipeRouter
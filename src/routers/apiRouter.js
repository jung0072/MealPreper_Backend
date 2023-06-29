const { Router } = require("express");
const RecipeController = require("../controllers/recipeController.js");

const RecipeRouter = Router();

RecipeRouter.get("/allRecipe", RecipeController.getAllRecipe);
RecipeRouter.post("/createRecipe", RecipeController.createRecipe);
RecipeRouter.post("/generateRecipe", RecipeController.generateRecipe);

module.exports = RecipeRouter
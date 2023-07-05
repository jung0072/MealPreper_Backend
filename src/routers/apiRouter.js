const { Router } = require("express");
const RecipeController = require("../controllers/recipeController.js");
const RecipeGenerator = require("../controllers/recipeGenerator.js");

const RecipeRouter = Router();

RecipeRouter.post("/generateRecipe", RecipeGenerator.generateRecipe);

// recipe routes
RecipeRouter.post("/recipe", RecipeController.createRecipe);
RecipeRouter.get("/recipe/:id", RecipeController.getRecipe);
RecipeRouter.put("/recipe/:id", RecipeController.updateRecipe);
RecipeRouter.delete("/recipe/:id", RecipeController.deleteRecipe);

module.exports = RecipeRouter
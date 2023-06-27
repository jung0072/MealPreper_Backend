const debug = require("debug")("app:recipeController");

const RecipeService = require("../services/recipeService");

// const Recipe = require("../models/recipeModel");

const getAllRecipe = async (req, res, next) => {
  debug("getAllRecipe");
  try {
    const recipe = await RecipeService.getAllRecipe();
    const dummyRecipe = [
      {
        title: "dummy title",
        description: "dummy description",
        ingredients: "dummy ingredients",
        instructions: ["dummy instructions", "dummy instructions"],
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        author: "dummy author",
        date: "2023-01-23T13:23Z",
      },
      {
        title: "dummy title2",
        description: "dummy description2",
        ingredients: "dummy ingredients2",
        instructions: ["dummy instructions2", "dummy instructions2"],
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        author: "dummy author2",
        date: "2023-01-23T13:23Z",
      },
    ];
    res.json({ data: dummyRecipe });
  } catch (error) {
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  debug("createRecipe");
  debug(req.body);
  try {
    const recipe = await RecipeService.createRecipe(req.body);
    res.json({ data: recipe });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllRecipe,
  createRecipe,
};

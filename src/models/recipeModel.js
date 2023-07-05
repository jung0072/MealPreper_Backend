const { Schema, Types, model } = require("mongoose");

const IngredientSchema = new Schema({
  ingredient: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

const RecipeSchema = new Schema(
  {
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: false,
    },
    ownerID: {
      type: Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
    ingredients: {
      type: [IngredientSchema],
      required: true,
    },
    instructions: {
      type: Array,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: false,
    },
    type: {
      type:  String,
      enum: ["MEAL_PREP_LUNCH", "MEAL_PREP_Dinner", "MEAL", "DESSERT", "SNACK", "DRINK", "OTHER"],
      default: "OTHER",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", RecipeSchema);

const { Schema, Types, model } = require("mongoose");

// Absolute amount
// Servings: 1
// Calories: 600kcals

// Ingredient image will be fetched with the name of the ingredient
// Absolute amount is for 1 serving
const IngredientSchema = new Schema({
  ingredientName: {
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
  blocks: {
    type: [Number], // Ingredient can be in multiple blocks
    required: true,
  },
  alternatives: {
    type: [String],
    required: false,
  },
  process: {
    type: String,
    required: false,
  }
});

const InstructionSchema = new Schema({
  instructionContent: {
    type: String,
    required: true,
  },
  block: {
    type: Number,
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
      type: [InstructionSchema],
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      enum: [
        "MEAL_PREP_LUNCH",
        "MEAL_PREP_Dinner",
        "MEAL",
        "DESSERT",
        "SNACK",
        "DRINK",
        "OTHER",
      ],
      default: "OTHER",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", RecipeSchema);

const { Schema, Types, model } = require("mongoose");

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    ownerID: {
      type: Types.ObjectId,
      required: true,
    },
    ingredient: {
      type: Map,
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
    rate: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Recipe", RecipeSchema);

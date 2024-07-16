const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RecipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
    instructions: [{ type: String, required: true }],
    image: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    ratings: [{ type: Schema.Types.ObjectId, ref: "Rating" }],
    averageRating: { type: Number, default: 0 },
    category: { type: String, required: true },
    prepTime: { type: Number, required: true },
    cookTime: { type: Number, required: true },
    totalTime: { type: Number, required: true },
    servings: { type: Number, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Recipe", RecipeSchema)

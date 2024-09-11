const mongoose = require("mongoose")
const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipe: { type: Schema.Types.ObjectId, ref: "Recipe", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Review", reviewSchema)

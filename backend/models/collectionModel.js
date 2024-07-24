const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CollectionSchema = new Schema(
  {
    name: { type: String, required: true },
    recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Collection", CollectionSchema)

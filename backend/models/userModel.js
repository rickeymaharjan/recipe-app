const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    profileImage: { type: String },
    createdRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    mealPlans: [{ type: Schema.Types.ObjectId, ref: "MealPlan" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)

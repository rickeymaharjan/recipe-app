const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mealTypes = ["breakfast", "lunch", "dinner", "snack"]
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const MealPlanSchema = new Schema(
  {
    name: { type: String, required: true },
    meals: [
      {
        type: { type: String, enum: mealTypes, required: true },
        day: { type: String, enum: daysOfWeek, required: true },
        recipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
      },
    ],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("MealPlan", MealPlanSchema)

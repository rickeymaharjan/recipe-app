const MealPlan = require("../models/mealPlanModel")

// Get all mealPlans
const getAllMealPlans = (req, res) => {
  MealPlan.find()
    .then((mealPlans) => {
      res.json(mealPlans)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}

// Get mealplan by ID
const getMealPlanById = (req, res) => {
  MealPlan.findById(req.params.id)
    .then((mealPlan) => {
      if (!mealPlan) {
        return res.status(404).json({ error: "MealPlan not found" })
      }
      res.json(mealPlan)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}

// Create mealplan
const createMealPlan = (req, res) => {
  const newMealPlan = new MealPlan({ ...req.body, createdBy: req.user_id })

  newMealPlan
    .save()
    .then((mealPlan) => {
      res.status(201).json(mealPlan)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}

// Update mealplan by ID
const updateMealPlanById = (req, res) => {
  MealPlan.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then((mealPlan) => {
      if (!mealPlan) {
        return res.status(404).json({ error: "MealPlan not found" })
      }
      res.json(mealPlan)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}

// Delete mealplan by ID
const deleteMealPlanById = (req, res) => {
  MealPlan.findByIdAndDelete(req.params.id)
    .then((mealPlan) => {
      if (!mealPlan) {
        return res.status(404).json({ error: "MealPlan not found" })
      }
      res.json(mealPlan)
    })
    .catch((error) => {
      res.status(500).json({ error: error.message })
    })
}

const addRecipeToMealPlan = (req, res) => {
  const { dayOfWeek, mealType, recipeId } = req.body
  MealPlan.findById(req.params.id)
    .then((mealPlan) => {
      if (!mealPlan) {
        return res.status(404).json({ error: "Meal plan not found" })
      }

      // Ensure meals is initialized
      if (!Array.isArray(mealPlan.meals)) {
        mealPlan.meals = []
      }

      const dayMeal = mealPlan.meals.find(
        (meal) => meal.dayOfWeek === dayOfWeek && meal.mealType === mealType
      )

      if (dayMeal) {
        dayMeal.recipes.push(recipeId)
      } else {
        mealPlan.meals.push({ dayOfWeek, mealType, recipes: [recipeId] })
      }

      return mealPlan.save()
    })
    .then((savedMealPlan) => {
      res.status(200).json(savedMealPlan)
    })
    .catch((error) => {
      res.status(400).json({ error: error.message })
    })
}

module.exports = {
  getAllMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlanById,
  deleteMealPlanById,
  addRecipeToMealPlan,
}

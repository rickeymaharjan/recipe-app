const express = require("express")
const mealPlanController = require("../controllers/mealPlanController")

const router = express.Router()

// Route to get all meal plans
router.get("/", mealPlanController.getAllMealPlans)

// Route to get a specific meal plan by ID
router.get("/:id", mealPlanController.getMealPlanById)

// Route to create a new meal plan
router.post("/", mealPlanController.createMealPlan)

// Route to add recipes to meal plan
router.post("/:id/addRecipe", mealPlanController.addRecipeToMealPlan)

// Route to update a meal plan by ID
router.put("/:id", mealPlanController.updateMealPlanById)

// Route to delete a meal plan by ID
router.delete("/:id", mealPlanController.deleteMealPlanById)

module.exports = router

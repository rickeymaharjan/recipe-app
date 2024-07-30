const express = require("express")
const recipeController = require("../controllers/recipeController")
const requireAuth = require("../middlewares/requireAuth")
const router = express.Router()

// GET all recipes
router.get("/", recipeController.getAllRecipes)

// GET a specific recipe by ID
router.get("/:id", recipeController.getRecipeById)

// POST a new recipe
router.post("/", requireAuth, recipeController.createRecipe)

// PUT (update) a recipe by ID
router.patch("/:id", recipeController.updateRecipe)

// DELETE a recipe by ID
router.delete("/:id", recipeController.deleteRecipe)

module.exports = router

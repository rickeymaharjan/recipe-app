// Import Recipe model
const Recipe = require("../models/recipeModel")

// Controller function to get all recipes
const getAllRecipes = (req, res) => {
  // Return the fetched recipes as a response
  Recipe.find({})
    .populate("createdBy", "username profileImage")
    .then((recipes) => {
      res.json(recipes)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch recipes" })
    })
}

// Controller function to get all recipes by user ID
const getAllRecipesByUserId = (req, res) => {
  const { id } = req.params

  Recipe.find({ createdBy: id })
    .populate("createdBy", "username profileImage")
    .then((recipes) => {
      if (recipes.length === 0) {
        return res.status(404).json({ error: "No recipes found for this user" })
      }

      res.json(recipes)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch recipes for this user" })
    })
}

// Controller function to get a single recipe by ID
const getRecipeById = (req, res) => {
  const { id } = req.params

  Recipe.findById(id)
    .populate("createdBy", "username profileImage")
    .populate({
      path: "reviews",
      populate: {
        path: "createdBy",
        select: "username profileImage",
      },
    })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" })
      }
      res.json(recipe)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch recipe" })
    })
}

// Controller function to create a new recipe
const createRecipe = (req, res) => {
  // Extract the recipe data from the request body
  const recipeData = { ...req.body, createdBy: req.user_id }

  // Filter out empty strings from the instructions array
  if (Array.isArray(recipeData.instructions)) {
    recipeData.instructions = recipeData.instructions.filter(
      (instruction) => instruction.trim() !== ""
    )
  }

  // Create the new recipe
  Recipe.create(recipeData)
    .then((newRecipe) => {
      res.json(newRecipe)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create recipe" })
    })
}

// Controller function to update an existing recipe
const updateRecipe = (req, res) => {
  // Extract the recipe ID from the request parameters
  const { id } = req.params

  const updatedRecipe = Recipe.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  )

  updatedRecipe
    .then((updatedRecipe) => {
      if (!updatedRecipe) {
        return res.status(404).json({ error: "Recipe not found" })
      }
      res.json(updatedRecipe)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update recipe" })
    })
}

// Controller function to delete a recipe
const deleteRecipe = (req, res) => {
  //   Extract the recipe ID from the request parameters
  console.log("deleteRecipe")
  const { id } = req.params

  Recipe.findByIdAndDelete(id)
    .then((deletedRecipe) => {
      if (!deletedRecipe) {
        return res.status(404).json({ error: "Recipe not found" })
      }
      res.json({ message: "Recipe deleted successfully" })
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete recipe" })
    })
}

// Export the controller functions
module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipesByUserId,
}

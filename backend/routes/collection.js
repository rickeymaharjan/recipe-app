const express = require("express")
const collectionController = require("../controllers/collectionController")
const requireAuth = require("../middlewares/requireAuth")
const router = express.Router()

// GET all collections
router.get("/", collectionController.getAllCollections)

// GET a specific collection by ID
router.get("/:id", collectionController.getCollectionById)

// GET all collections by user ID
router.get("/user/:id", collectionController.getCollectionsByUserId)

// GET a specific collection by ID with recipe details
router.get("/recipes/:id", collectionController.getCollectionsByIdWithRecipes)

// POST a new collection
router.post("/", requireAuth, collectionController.createCollection)

// PUT/update a collection by ID
router.patch("/:id", collectionController.updateCollection)

// POST/add a recipe to a collection
router.post(
  "/:collectionId/add-recipe",
  collectionController.addRecipeToCollection
)

// DELETE/remove a recipe from a collection
router.delete(
  "/:collectionId/remove-recipe/:recipeId",
  collectionController.removeRecipeFromCollection
)

// DELETE a collection by ID
router.delete("/:id", collectionController.deleteCollection)

module.exports = router

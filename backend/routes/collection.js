const express = require("express")
const collectionController = require("../controllers/collectionController")

const router = express.Router()

// GET all collections
router.get("/", collectionController.getAllCollections)

// GET a specific collection by ID
router.get("/:id", collectionController.getCollectionById)

// POST a new collection
router.post("/", collectionController.createCollection)

// PUT/update a collection by ID
router.patch("/:id", collectionController.updateCollection)

// router.patch("/:id", collectionController.addRecipeToCollection)

// DELETE a collection by ID
router.delete("/:id", collectionController.deleteCollection)

module.exports = router

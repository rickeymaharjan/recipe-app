const Collection = require("../models/collectionModel")

// Get all collections
const getAllCollections = (req, res) => {
  Collection.find()
    .then((collections) => {
      res.json(collections)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error getting all collection" })
    })
}

// Get collection by ID
const getCollectionById = (req, res) => {
  Collection.findById(req.params.id)
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }
      res.json(collection)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error getting collection by id" })
    })
}

// Get collections by user ID
const getCollectionsByUserId = (req, res) => {
  Collection.find({ createdBy: req.params.id })
    .populate("recipes", "imageFilename")
    .then((collections) => {
      res.json(collections)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error getting collections by user id" })
    })
}

// Get collections by ID with recipe details
const getCollectionsByIdWithRecipes = (req, res) => {
  Collection.findById(req.params.id)
    .populate({
      path: "recipes",
      populate: { path: "createdBy" },
    })
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }
      res.json(collection)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error getting collection by id" })
    })
}

// Create a new collection
const createCollection = (req, res) => {
  const newCollection = new Collection({ ...req.body, createdBy: req.user_id })

  newCollection
    .save()
    .then((collection) => {
      res.status(201).json(collection)
    })
    .catch((error) => {
      res.status(500).json({ error: "Error creating collection" })
    })
}

// Update a collection by ID
const updateCollection = (req, res) => {
  Collection.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }
      res.json(collection)
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Add recipe to a collection
const addRecipeToCollection = (req, res) => {
  const { collectionId } = req.params
  const { recipeId } = req.body

  Collection.findById(collectionId)
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }

      // Check if recipe already exists in the collection
      if (collection.recipes.includes(recipeId)) {
        return res
          .status(400)
          .json({ error: "Recipe already exists in the collection" })
      }

      // Add the recipe to the collection
      collection.recipes.push(recipeId)
      return collection.save().then((updatedCollection) => {
        res.status(201).json(updatedCollection)
      })
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Remove recipe from a collection
const removeRecipeFromCollection = (req, res) => {
  const { collectionId, recipeId } = req.params

  console.log(collectionId, recipeId)

  Collection.findById(collectionId)
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }

      // Check if recipe exists in the collection
      if (!collection.recipes.includes(recipeId)) {
        return res
          .status(400)
          .json({ error: "Recipe not found in the collection" })
      }

      // Remove the recipe from the collection
      collection.recipes = collection.recipes.filter(
        (id) => id.toString() !== recipeId.toString()
      )
      return collection.save().then((updatedCollection) => {
        res.status(200).json(updatedCollection)
      })
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Delete a collection by ID
const deleteCollection = (req, res) => {
  Collection.findByIdAndDelete(req.params.id)
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }
      res.json({ message: "Collection deleted" })
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  addRecipeToCollection,
  removeRecipeFromCollection,
  getCollectionsByUserId,
  getCollectionsByIdWithRecipes,
}

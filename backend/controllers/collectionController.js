const Collection = require("../models/collectionModel")

// Get all collections
const getAllCollections = (req, res) => {
  Collection.find()
    .then((collections) => {
      res.json(collections)
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
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
      res.status(500).json({ error: "Server error" })
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
      res.status(500).json({ error: "Server error" })
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
  const { collectionId, recipeId } = req.params

  Collection.findById(collectionId)
    .then((collection) => {
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" })
      }

      // Check if recipe already exists in the collection
      if (collection.recipes.includes(recipeId)) {
        return res.status(400).json({ error: "Recipe already exists in the collection" })
      }

      // Add the recipe to the collection
      collection.recipes.push(recipeId)
      collection.save()

      res.json(collection)
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
}

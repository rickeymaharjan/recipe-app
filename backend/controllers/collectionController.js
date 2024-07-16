const Collection = require("../models/collectionModel")

// Get all collections
const getCollections = (req, res) => {
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
  const newCollection = new Collection(req.body)
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
  getAllCollections, // Get all collections
  getCollectionById, // Get collection by ID
  createCollection, // Create a new collection
  updateCollection, // Update a collection by ID
  deleteCollection, // Delete a collection by ID
}

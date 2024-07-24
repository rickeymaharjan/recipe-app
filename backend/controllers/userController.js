const User = require("../models/userModel")

// Controller function to get all users
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Controller function to get a single user by ID
const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Controller function to create a new user
const createUser = async (req, res) => {
  const { email } = req.body

  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" })
    }

    const newUser = new User(req.body)
    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error: "Server error" })
  }
}

// Controller function to update a user by ID
const updateUserById = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Controller function to delete a user by ID
const deleteUserById = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json({ message: "User deleted successfully" })
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error" })
    })
}

// Export the controller functions
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}

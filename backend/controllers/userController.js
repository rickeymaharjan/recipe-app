const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "12h" })
}

const loginUser = (req, res) => {
  const { email, password } = req.body
  User.login(email, password)
    .then((user) => {
      const token = createToken(user.id)
      const { password, createdAt, updatedAt, ...userWithoutSensitiveInfo } =
        user._doc
      return res.status(200).json({ user: userWithoutSensitiveInfo, token })
    })
    .catch((error) => {
      return res.status(400).json({ error: `${error}` })
    })
}

const signupUser = (req, res) => {
  const { username, email, password } = req.body

  User.signup(username, email, password)
    .then((user) => {
      const token = createToken(user.id)
      const { password, createdAt, updatedAt, ...userWithoutSensitiveInfo } =
        user._doc
      return res.status(200).json({ user: userWithoutSensitiveInfo, token })
    })
    .catch((error) => {
      return res.status(500).json({ error: `${error}` })
    })
}

// Controller function to get all users
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal server error" })
    })
}

// Controller function to get user by username
const getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      const { password, createdAt, updatedAt, ...userWithoutSensitiveInfo } =
        user._doc

      res.status(200).json(userWithoutSensitiveInfo)
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user" })
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
      res.status(500).json({ error: "Internal server error" })
    })
}

// Get current user
const getCurrentUser = (req, res) => {
  console.log("currentUserTrigger")
  const userId = req.user_id
  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" })
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }
      res.status(200).json(user)
    })
    .catch((error) => {
      console.log("Error fetching current user:", error)
      res.status(500).json({ error: "Internal Server error" })
    })
}

// Controller function to create a new user
const createUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({ error: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ ...req.body, password: hashedPassword })
    const user = await newUser.save()
    return res.status(201).json(user)
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
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
      res.status(500).json({ error: "Internal server error" })
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
      res.status(500).json({ error: "Internal server error" })
    })
}

const checkToken = (req, res) => {
  res.status(200).json({ message: "Token is valid" })
}

// Export the controller functions
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  loginUser,
  signupUser,
  getCurrentUser,
  checkToken,
  getUserByUsername,
}

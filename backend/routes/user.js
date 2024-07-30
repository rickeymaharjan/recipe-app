const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router()

// Define routes for user
// Get all users
router.get("/", userController.getAllUsers)

// Get user by ID
router.get("/:id", userController.getUserById)

// Create a new user
router.post("/", userController.createUser)

// Update user by ID
router.patch("/:id", userController.updateUserById)

// Delete user by ID
router.delete("/:id", userController.deleteUserById)

// Login user
router.post("/login", userController.loginUser)

// Signup user
router.post("/signup", userController.signupUser)

module.exports = router

module.exports = router

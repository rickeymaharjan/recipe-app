const express = require("express")
const reviewController = require("../controllers/reviewController")
const requireAuth = require("../middlewares/requireAuth")

const router = express.Router()

// GET all reviews
router.get("/", reviewController.getAllReviews)

// GET a specific review by ID
router.get("/:id", reviewController.getReviewById)

// POST a new review
router.post("/:recipeId", requireAuth, reviewController.createReview)

// PATCH (update) a review by ID
router.patch("/:id", reviewController.updateReviewById)

// DELETE a review by ID
router.delete("/:id", reviewController.deleteReviewById)

module.exports = router

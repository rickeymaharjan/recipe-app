const Review = require("../models/reviewModel")
const Recipe = require("../models/recipeModel")

// Controller function to get all reviews
const getAllReviews = (req, res) => {
  Review.find({})
    .then((reviews) => {
      res.json(reviews)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch reviews" })
    })
}

// Controller function to get a review by ID
const getReviewById = (req, res) => {
  Review.findById(req.params.id)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" })
      }
      res.json(review)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch review" })
    })
}

// Controller function to create a new review
const createReview = (req, res) => {
  const { recipeId } = req.params
  const { reviewData } = req.body

  const newReview = new Review({
    ...reviewData,
    recipe: recipeId,
    createdBy: req.user_id,
  })

  newReview
    .save()
    .then((review) => {
      Recipe.findByIdAndUpdate(review.recipe, {
        $push: { reviews: review._id },
      })
        .then(() => {
          return Review.findById(review._id).populate(
            "createdBy",
            "username profileImage"
          )
        })
        .then((populatedReview) => {
          return res.status(201).json(populatedReview)
        })
        .catch((error) => {
          return res
            .status(500)
            .json({ error: "Failed to update recipe with review" })
        })
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json({ error: "Failed to create review" })
    })
}

// Controller function to update a review by ID
const updateReviewById = (req, res) => {
  Review.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" })
      }
      res.status(200).json(review)
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update review" })
    })
}

// Controller function to delete a review by ID
const deleteReviewById = (req, res) => {
  Review.findByIdAndDelete(req.params.id)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ error: "Review not found" })
      }
      Recipe.findByIdAndDelete(review.recipe, {
        $pull: { reviews: review._id },
      }).then(() => {
        return res.status(204).json({ message: "Review deleted successfully" })
      })
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete review" })
    })
}

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
}

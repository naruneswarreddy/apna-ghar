const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Get all reviews for a listing
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

// Create a new review
router.route("/")
    .post(isLoggedIn,validateReview,wrapAsync(reviewController.createReview))
    .get(isLoggedIn, wrapAsync(reviewController.index))

module.exports = router;
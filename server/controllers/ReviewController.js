const Review = require("../models/ReviewsModel");

// Controller to add a new review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({
      userId: req.userId,
      name: req.username,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ msg_success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller to update a review
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { rating, comment },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res
      .status(200)
      .json({ message: "Review updated successfully", updatedReview });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

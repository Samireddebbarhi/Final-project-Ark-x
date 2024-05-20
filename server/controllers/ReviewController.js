const Review = require("../models/ReviewsModel");
const ProductModel = require("../models/ProductModel");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = new Review({
      productId: req.params.id,
      userId: req.user._id,
      name: req.user.username,
      rating,
      comment,
    });
    await review.save();
    const product = await ProductModel.findById(review.productId);

    if (!product) {
      return res.status(404).send(`No product with the id ${review.productId}`);
    } else {
      product.reviews.push(review._id);
      await product.save();
      res.status(201).json({ message: "Review added successfully", review });
    }
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

exports.deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.deleteOne({ _id: req.params.id });
    if (!deletedReview) {
      return res.status(404).json({ error: "No review with that ID." });
    }

    // Remove the reference to the deleted review from the product's reviews array
    await ProductModel.updateOne(
      { "reviews.details": deletedReview._id },
      { $pull: { reviews: { details: deletedReview._id } } }
    );

    res.status(200).json({ message: "Deletion successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    name: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
      min: [1, "rating can not be less then 1."],
      max: [5, "rating can not be greater than 5"],
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Review", ReviewSchema);

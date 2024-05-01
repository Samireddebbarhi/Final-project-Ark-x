const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    userId: {
<<<<<<< HEAD
      type: String,
=======
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
    },
    name: {
      type: String,
    },
    rating: {
      type: Number,
      required: true,
<<<<<<< HEAD
      min: [1, "rating can not be less then 1."],
      max: [5, "rating can not be greater than 5"],
=======
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
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

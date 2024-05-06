const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add the product name"],
    },
    description: {
      type: String,
      required: [true, "please add the product description"],
    },
    price: {
      type: Number,
      required: [true, "please add the product price"],
      maxLength: [8, "price is too high only 8 figures are valid"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    image: {
      details: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Image",
<<<<<<< HEAD
<<<<<<< HEAD
          //  required: [true, "please Enter the images"],
=======
          required: [true, "please Enter the images"],
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
          //  required: [true, "please Enter the images"],
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
        },
      ],
    },
    category: {
<<<<<<< HEAD
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
=======
      type: String,
      required: [true, "please Enter the product category"],
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
    },

    location: {
      type: String,
    },
<<<<<<< HEAD
    adsplatform: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
=======
    numofReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
<<<<<<< HEAD
<<<<<<< HEAD
        customers: {
          type: mongoose.Schema.ObjectId,
          ref: "Review",
          required: true,
        },
=======
        type: mongoose.Schema.ObjectId,
        ref: "Review",
        required: true,
>>>>>>> 4c21d3e4f07d69293a84aaa3ce534eb17ac811dd
=======
        type: mongoose.Schema.ObjectId,
        ref: "Review",
        required: true,
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
    },
  },
  {
    timestamps: true,
  }

);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;

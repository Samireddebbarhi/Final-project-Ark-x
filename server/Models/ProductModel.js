const mongoose = require("mongoose");
const Category = require("./CategoryModel");
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
          //  required: [true, "please Enter the images"],
=======
          required: [true, "please Enter the images"],
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
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
        customers: {
          type: mongoose.Schema.ObjectId,
          ref: "Review",
          required: true,
        },
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

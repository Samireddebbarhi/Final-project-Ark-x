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
      type: String,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: {
      type: Number,
      required: [true, "please Enter the product stock"],
      maxLength: [4, "max stock is of 4 figure"],
      default: 1,
    },
    numofReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
        required: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;

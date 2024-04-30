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
          //  required: [true, "please Enter the images"],
        },
      ],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    location: {
      type: String,
    },
    adsplatform: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }

);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;

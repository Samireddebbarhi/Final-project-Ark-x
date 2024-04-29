const mongoose = require("mongoose");
<<<<<<< HEAD
const SchemaProduct = new mongoose.Schema(
=======

const productSchema = new mongoose.Schema(
>>>>>>> 52f2c6e9f3e9ec304d09b9e68b967bb5427ed5cf
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
<<<<<<< HEAD
      required: true,
    },
    currency: {
      type: String,
      default: "USD",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

  location: {
    type: String,
    required: true,
=======
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
      type: String,
      required: [true, "please Enter the product category"],
    },
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
        customers: {
          type: mongoose.Schema.ObjectId,
          ref: "Review",
          // required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
>>>>>>> 52f2c6e9f3e9ec304d09b9e68b967bb5427ed5cf
  },
  adsplatform: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }

);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;

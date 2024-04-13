const mongoose = require("mongoose");

const SchemaProduct = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
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

const ProductModel = mongoose.model("Product", SchemaProduct); // Removed export default

module.exports = ProductModel; // Export ProductModel instead

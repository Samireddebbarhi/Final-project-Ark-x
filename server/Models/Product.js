const mongoose = require("mongoose");

const SchemaProduct = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Changed integer to Number
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  adsplatform: {
    type: String,
    required: true,
  },
  rating: {
    type: String, 
    required: true,
  },
});

const ProductModel = mongoose.model("Product", SchemaProduct); // Removed export default

module.exports = ProductModel; // Export ProductModel instead

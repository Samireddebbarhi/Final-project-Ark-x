const mongoose = require("mongoose");

const SchemaCategory = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String, // Changed string to String
    required: true,
  },
  products: {
    type: String,
    required: true,
  },
});

const CategoryModel = mongoose.model("Category", SchemaCategory); // Changed ProductModel to CategoryModel

module.exports = CategoryModel; // Export CategoryModel instead of ProductModel

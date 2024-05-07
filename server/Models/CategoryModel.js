const mongoose = require("mongoose");

const SchemaCategory = new mongoose.Schema({
  name: { type: String, required: true },

  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

const CategoryModel = mongoose.model("Category", SchemaCategory); // Changed ProductModel to CategoryModel

module.exports = CategoryModel; // Export CategoryModel instead of ProductModel
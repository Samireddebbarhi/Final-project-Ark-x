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
    type: integer,
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

export default ProductModel = mongoose.model("Product", SchemaProduct);

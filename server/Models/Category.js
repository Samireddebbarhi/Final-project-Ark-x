const mongoose = require("mongoose");

const SchemaCategory = new mongoose.Schema({
  productid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  products: {
    type: list,
    required: true,
  },
});

export default ProductModel = mongoose.model("Product", SchemaProduct);

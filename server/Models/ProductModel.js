const mongoose = require("mongoose");

const SchemaProduct = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required : true,
      unique: true,
      lowercase: true,

    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    brand:{
      type: String,
      enum: ["Apple","Samsung"]
    },
    quantity: {
      type: Number,
    },
    image:{
      type: String,
    },
    rating: [
      {
        star: Number,
        postedby:  {type: mongoose.Schema.Types.ObjectId, ref: "User"},
      }
    ]
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("Product", SchemaProduct); // Removed export default

module.exports = ProductModel; // Export ProductModel instead

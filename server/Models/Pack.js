const mongoose = require("mongoose");

const SchemaPack = new mongoose.Schema({
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
  features: {
    type: String,
    required: true,
  },
});

const PackModel = mongoose.model("Pack", SchemaPack); // Removed export default

module.exports = PackModel; // Export PackModel instead

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
    type: integer,
    required: true,
  },
  features: {
    type: list,
    required: true,
  },
});

export default PackModel = mongoose.model("Pack", SchemaPack);

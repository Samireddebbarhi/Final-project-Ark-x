const mongoose = require("mongoose");

const SchemaCustomer = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,

    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  premiumStatus: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default CustomerModel = mongoose.model("Customer", SchemaCustomer);

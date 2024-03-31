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
  dateofbirth: {
    type: Date, // Changed to Date if it should represent a date
    required: true,
  },
  premiumstatus: {
    type: Boolean,
    required: true,
  },
  createdat: {
    type: Date,
    required: true,
    default: Date.now // Added default value to set current date/time
  },
});

const CustomerModel = mongoose.model("Customer", SchemaCustomer); // Removed export default

module.exports = CustomerModel; // Export CustomerModel instead

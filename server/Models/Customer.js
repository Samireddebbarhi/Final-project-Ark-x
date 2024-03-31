const mongoose = require("mongoose");
const SchemaCustomer = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    date_of_birth: {
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
    permium_status: {
      type : Boolean,
      default: false,
    },
    createdAt: { type: Date, default: Date.now() },
  });
 const CustomerModel = mongoose.model("Customer", SchemaCustomer);
 module.exports = CustomerModel; 
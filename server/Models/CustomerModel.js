const mongoose = require('mongoose')
const SchemaCustomer = new mongoose.Schema(
  {
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
      default: false, //false means customer is not a premium member
    },
  },
  {
    timestamps: true,
  }
);


const CustomerModel = mongoose.model("Customer", SchemaCustomer);
module.exports = CustomerModel;

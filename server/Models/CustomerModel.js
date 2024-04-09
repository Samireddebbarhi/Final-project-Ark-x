const mongoose = require("mongoose");

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

// HEAD
const  CustomerModel = mongoose.model("Customer", SchemaCustomer);

//const CustomerModel = mongoose.model("Customer", SchemaCustomer);
//e4ebd8e905e4957ceeec146e9e4f44a8b0375ba7
module.exports = CustomerModel;

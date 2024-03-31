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
    type: String,
    required: true,
  },
  premiumstatus: {
    type: Boolean,
    required: true,
  },
  createdat: {
    type: Date,
    required: true,
  },
});

export default CustomerModel = mongoose.model("Customer", SchemaCustomer);

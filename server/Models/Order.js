const mongoose = require("mongoose");

const SchemaOrder = new mongoose.Schema({
  customerid: {
    type: String,
    required: true,
  },
  orderdate: {
    type: String,
    required: true,
  },
  totalamount: {
    type: Number, // Changed to Number if this should represent a numeric value
    required: true,
  },
});

const OrderModel = mongoose.model("Order", SchemaOrder); // Removed export default

module.exports = OrderModel; // Export OrderModel instead

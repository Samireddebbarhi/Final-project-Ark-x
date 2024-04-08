const mongoose = require("mongoose");

const SchemaOrder = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Customer model i added
    required: true,
  },
  orderDate: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number, // Changed to Number if this should represent a numeric value
    required: true,
  },
});

const OrderModel = mongoose.model("Order", SchemaOrder); // Removed export default

module.exports = OrderModel; // Export OrderModel instead

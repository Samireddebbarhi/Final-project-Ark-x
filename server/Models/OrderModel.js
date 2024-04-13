const mongoose = require("mongoose");

const SchemaOrder = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number, // Changed to Number if this should represent a numeric value
    required: true,
  },
});

const OrderModel = mongoose.model("Order", SchemaOrder); // Removed export default

module.exports = OrderModel; // Export OrderModel instead

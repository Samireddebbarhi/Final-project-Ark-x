const mongoose = require("mongoose");

const SchemaOrder = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  ],
  paymentInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing"],
    default: "Pending",
  },

  orderDate: {
    type: Date,
    required: Date.now(),
  },
  totalAmount: {
    type: Number, // Changed to Number if this should represent a numeric value
    required: true,
  },
});

const OrderModel = mongoose.model("Order", SchemaOrder); // Removed export default

module.exports = OrderModel; // Export OrderModel instead

const mongoose = require("mongoose");

const SchemaPayment = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now() },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "PayPal", "Bank Transfer"],
    required: true,
  },
});

const PaymentModel = mongoose.model("Payment", SchemaPayment); // Removed export default

module.exports = PaymentModel; // Export PaymentModel instead

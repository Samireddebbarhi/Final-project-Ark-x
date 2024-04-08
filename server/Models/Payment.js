const mongoose = require("mongoose");

const SchemaPayment = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  amountPaid: {
    type: Number, // Changed Integer to Number
    required: true,
  },
});

const PaymentModel = mongoose.model("Payment", SchemaPayment); // Removed export default

module.exports = PaymentModel; // Export PaymentModel instead

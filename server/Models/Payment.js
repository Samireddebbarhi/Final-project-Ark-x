const mongoose = require("mongoose");

const SchemaPayment = new mongoose.Schema({
  orderid: {
    type: String,
    required: true,
  },
  paymentmethod: {
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

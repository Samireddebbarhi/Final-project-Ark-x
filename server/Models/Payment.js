const mongoose = require("mongoose");

const SchemaOrder = new mongoose.Schema({
  orderid: {
    type: String,
    required: true,
  },
  paymentmethod: {
    type: String,
    required: true,
  },
  amountpaid: {
    type: integer,
    required: true,
  },
});

export default PaymentModel = mongoose.model("Payment", SchemaPayment);

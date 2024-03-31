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
    type: String,
    required: true,
  },
});

export default OrderModel = mongoose.model("Order", SchemaOrder);

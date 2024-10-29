const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderItem: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      Idproduct: {
        type: String,
        required: true,
      },
    },
  ],
  userInfo: [
    {
      userId: { type: String, required: true },
      username: {
        type: String,
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  deliveredAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;

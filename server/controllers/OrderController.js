const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

const newOrder = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantityItem, paymentInfo } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    /*const updatedStock = await updateStock(productId, quantityItem);
    if (!updatedStock) {
      return res
        .status(404)
        .json({ succes: false, message: "Error Updated Stock " });
    }*/
    // Create the order
    const order = await Order.create({
      orderItem: [
        {
          name: product.name,
          price: product.price,
          quantity: quantityItem,
          image: product.image,
          Idproduct: product._id,
        },
      ],
      paymentInfo,
      totalPrice: product.price * quantityItem,
      paidAt: Date.now(),
      userInfo: { userId: req.user._id, username: req.user.username },
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name ",
    "email"
  );
  if (!order) {
    res.status(404);
    throw new Error("order not found with this id");
  }
  res.status(200).json({
    success: true,
    order,
  });
};
const myOrder = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  if (!orders) {
    res.status(404);
    throw new Error("order not found with this id");
  }
  res.status(200).json({
    success: true,

    orders,
  });
};

async function updateStock(id, quantity, increase = false) {
  const product = await Product.findById(id);
  if (increase) {
    product.stock += quantity;
  } else {
    product.stock -= quantity;
  }
  await product.save({ validateBeforeSave: false });
  return product;
}

const updateOrder = async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id);

    if (!orders) {
      res.status(404);
      throw new Error("Order not found with this id");
    }

    if (orders.orderStatus === "paid" && req.body.status !== "cancelled") {
      res.status(400);
      throw new Error("You have already sold this order");
    }

    orders.orderItem.forEach((order) => {
      if (req.body.status === "cancelled") {
        updateStock(order.Idproduct, order.quantity, true);
      } else {
        updateStock(order.Idproduct, order.quantity);
      }
    });

    orders.orderStatus = req.body.status;
    if (req.body.status === "delivered") {
      orders.deliveredAt = Date.now();
    }

    await orders.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
};
const deleteOrder = async (req, res) => {
  const orders = await Order.findByIdAndDelete(req.params.id);
  if (!orders) {
    res.status(404);
    throw new Error("Order not found with this Id");
  }

  res.status(200).json({
    success: true,
  });
};
module.exports = {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
};

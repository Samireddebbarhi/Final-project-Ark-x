const express = require('express');
const routerOrder = express.Router();
const OrderModel = require('../Models/OrderModel');
const mongoose = require('mongoose')

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate('products');

    res.json(orders);
} catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
}
}
// 
const addOrders = async (req, res) => {
  const { customerId, products, totalAmount } = req.body;
  const order = new OrderModel({
    customerId: customerId,
    products: products, 
    totalAmount: totalAmount
});

  try{
      const newOrder = await order.save();
        res.status(201).json('new order have been added', newOrder);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

// 
const getOrderById = async(req, res) =>{
  try {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid order ID' });
    }

    const order = await OrderModel.findById(orderId).populate('products');

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
} catch (error) {
    
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
}
}
// 
const updateOrder = async(req, res) =>{
  const orderId = req.params.id; 
  const { products, totalAmount, orderDate } = req.body;

  try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(
          orderId,
          { products, totalAmount, orderDate },
          { new: true } 
      );

     
      if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }

      res.json(updatedOrder);
  } catch (error) {
    
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Failed to update order' });
  }
}
// 
const deleteOrder = async (req, res) => {
  const orderId = req.params.id; 
  try {
     
      const deletedOrder = await OrderModel.findByIdAndDelete(orderId);

      if (!deletedOrder) {
          return res.status(404).json({ message: 'Order not found' });
      }

      res.json({ message: 'Order deleted successfully', deletedOrder });
  } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ message: 'Failed to delete order' });
  }
  };

  
module.exports = {
    getAllOrders ,
    addOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
}

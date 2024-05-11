const OrderModel = require('../Models/OrderModel');
const CustomerModel = require('../models/CustomerModel.js')
const ProductModel = require('../models/ProductModel.js')
// view order by the admin 
const viewOrders = async (req, res) => {
  try {
    // Assuming checkRoleAndPermission middleware sets user role in req.user.role
    if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ success: false, msg: "Unauthorized: Insufficient role permissions" });
    }

    const orders = await OrderModel.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, msg: "No orders exist in the database" });
    }
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ success: false, msg: "Failed to fetch orders", error: error.message });
  }
};  
// Get All orders
const getAllOrders = async (req, res) => {
    try {
      
      const orders = await OrderModel.find().populate('products').populate({
        path: 'customerId', // Populate the 'customerId' field
        select: 'username' // Select only the 'username' field of the customer
      });
  
      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        data: orders,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch orders',
        error: error.message,
      });
    }
};
  

// Add order
const addOrders = async (req, res) => {
    const order = req.body;
    try {
      const customerId = req.id; // Assuming req.id holds the customer ID
      console.log('Customer ID:', customerId);
  
      const findCustomer = await CustomerModel.findById(customerId);
      if (!findCustomer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
  
      const productNames = order.products; // Array of product names
      if (!productNames || productNames.length === 0) {
        return res.status(400).json({ success: false, message: 'Products array is empty or missing' });
      }
  
      const productIds = [];
      for (const productName of productNames) {
        const foundProduct = await ProductModel.findOne({ name: productName });
        if (!foundProduct) {
          return res.status(404).json({ success: false, message: `Product '${productName}' not found` });
        }
        productIds.push(foundProduct._id); // Collect product IDs
      }
  
      // Create a new order with customer ID and product IDs
      const newOrder = new OrderModel({
        customerId: findCustomer._id,
        products: productIds,
        totalAmount: order.totalAmount, // Assuming totalAmount is provided in the order object
      });
  
      await newOrder.save();
  
      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: newOrder,
      });
    } catch (error) {
      console.error('Error adding order:', error);
      res.status(500).json({
        success: false,
        message: 'Error adding order',
        error: error.message,
      });
    }
  };
  
 
  


// Update order
const updateOrder = async (req, res) => {
    const orderId = req.params.id; // Assuming order ID is provided in the request parameters
    const updateData = req.body; // Updated data for the order
  
    try {
      // Find the existing order by ID
      const existingOrder = await OrderModel.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      // Update order properties based on the request body
      if (updateData.customerId) {
        const customer = await CustomerModel.findById(updateData.customerId);
        if (!customer) {
          return res.status(404).json({ success: false, message: 'Customer not found' });
        }
        existingOrder.customerId = updateData.customerId;
      }
  
      if (updateData.products) {
        const productIds = [];
        for (const productName of updateData.products) {
          const foundProduct = await ProductModel.findOne({ name: productName });
          if (!foundProduct) {
            return res.status(404).json({ success: false, message: `Product '${productName}' not found` });
          }
          productIds.push(foundProduct._id);
        }
        existingOrder.products = productIds;
      }
  
      if (updateData.totalAmount) {
        existingOrder.totalAmount = updateData.totalAmount;
      }
  
      // Save the updated order
      const updatedOrder = await existingOrder.save();
  
      // Respond with success message and updated order data
      res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        data: updatedOrder,
      });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({
        success: false,
        message: 'Error updating order',
        error: error.message,
      });
    }
  };
  
  
//  Delete order
const deleteOrder = async (req, res) => {
    const orderId = req.params.id; // Assuming order ID is provided in the request parameters
  
    try {
      // Find and delete the order by ID
      const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
  
      if (!deletedOrder) {
        return res.status(404).json({ success: false, message: 'Order not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'Order deleted successfully',
        deletedOrder: deletedOrder,
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete order',
        error: error.message,
      });
    }
  };
  
  
module.exports ={
    addOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
    viewOrders
}
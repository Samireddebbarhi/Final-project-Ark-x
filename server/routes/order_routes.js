const express = require("express");
const orderRoute = express.Router();
const orderCrud = require("../controllers/OrderController");


orderRoute.post('/addorder',  orderCrud.addOrders );
orderRoute.get('/getorders', orderCrud.getAllOrders );
orderRoute.get('/:id', orderCrud.getOrderById );
orderRoute.put('/:id', orderCrud.updateOrder);
orderRoute.delete('/:id', orderCrud.deleteOrder );

module.exports = orderRoute;
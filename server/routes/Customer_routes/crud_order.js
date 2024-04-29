const express = require("express");
const route = express.Router();
const orderCrud = require("../../controllers/OrderController");
const verifyJwtCustomer = require("../../middlewares/verifyJwtCus")


route.post("/addorder", orderCrud.addOrders)
route.get("/orders", orderCrud.getAllOrders)

route.put("/:id", orderCrud.updateOrder)

module.exports = route;
const express = require("express");
const payment_controller = require("../controllers/PaymentController");
const pay_router = express.Router();
pay_router.post("/", payment_controller.createOrder);
pay_router.post("/:orderID/capture", payment_controller.captureOrder);
//pay_router.get("/landing", payment_controller.render);

module.exports = pay_router;

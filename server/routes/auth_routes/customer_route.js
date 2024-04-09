const express = require("express");
const  authenticate = require("../../controllers/authControllers/Customer_auth");
const customerRoute = express.Router();


customerRoute.post("/register", authenticate.customerRegister);
customerRoute.get("/login", authenticate.customerLogin);
customerRoute.put("/update", authenticate.customer_update)


module.exports = customerRoute;
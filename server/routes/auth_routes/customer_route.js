const authenticate = require("../../controllers/authControllers/Customer_auth");
const express = require("express");

const customerRoute = express.Router();

customerRoute.post("/logout", authenticate.customerLogout);
customerRoute.post("/register", authenticate.customerRegister);
customerRoute.post("/login", authenticate.customerLogin);
customerRoute.put("/update", authenticate.customer_update);

module.exports = customerRoute;

const authenticate = require("../../controllers/authControllers/Customer_auth");
const express = require("express");

const customerRoute = express.Router();

customerRoute.post("/logout", authenticate.customerLogout);
customerRoute.post("/register", authenticate.customerRegister);
customerRoute.post("/login", authenticate.customerLogin);
customerRoute.post("/forgotPassword", authenticate.forgotPassword);
customerRoute.post("/resetPassword/:userId/:token", authenticate.resetPassword);
customerRoute.put("/update", authenticate.customer_update);

module.exports = customerRoute;

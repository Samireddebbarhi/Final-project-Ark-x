const express = require("express");
const  authenticate = require("../../controllers/authControllers/Customer_auth");
const customerRoute = express.Router();


customerRoute.post("/register", authenticate.customerRegister);
customerRoute.get("/login", authenticate.customerLogin);

module.exports = customerRoute;
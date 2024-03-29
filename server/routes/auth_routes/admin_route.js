const express = require("express");
const authenticate = require("../../controllers/authControllers/Admin_auth");
const authRoute = express.Router();

authRoute.post("/register", authenticate.register);
authRoute.get("/login", authenticate.login);

module.exports = authRoute;

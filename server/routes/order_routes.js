const express = require("express");
const  OrderRoute = express.Router();
const controller = require('../controllers/OrderController')
const {
    checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

// get all orders
OrderRoute.get(
    "/viewOrders",
    checkRoleAndPermission(["super_admin", "admin"], "read"),
    controller.viewOrders
);
// OrderRoute.post(
//     "/addorder",
//     checkRoleAndPermission(["super_admin", "admin"], "create"),
//     controller.addOrders
// );



module.exports  = OrderRoute;
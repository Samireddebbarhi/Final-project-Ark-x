const express = require("express");
const route = express.Router();
const orderController = require("../../controllers/OrderController");
const {
  checkRoleAndPermission,
} = require("../../middlewares/verifyRole_permission");
const controller = require("../../controllers/ReviewController");

route.post(
  "/order/new/:id",
  checkRoleAndPermission(["user"], "create"),
  orderController.newOrder
);
route.get(
  "/order/getOrder",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  orderController.getSingleOrder
);
route.get(
  "/order/getAll",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  orderController.getAllOrders
);

route.put(
  "/order/:id",
  checkRoleAndPermission(["super_admin", "admin"], "update"),
  orderController.updateOrder
);
route.delete(
  "/order/:id",
  checkRoleAndPermission(["super_admin", "admin"], "delete"),
  orderController.deleteOrder
);
module.exports = route;
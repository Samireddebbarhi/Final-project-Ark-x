const express = require("express");
const crudRouter = express.Router();
const Crud = require("../../controllers/data_controllers/Customer_CRUD");

const {
  checkRoleAndPermission,
} = require("../../middlewares/verifyRole_permission");

crudRouter.get(
  "/customers/All",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  Crud.getAllCustomers
);
crudRouter.get(
  "/customers/:id",
  checkRoleAndPermission(["admin", "super_admin","user"], "read"),
  checkRoleAndPermission(["admin", "super_admin", "user"], "read"),
  Crud.getById
);
crudRouter.delete(
  "/customers/:id",
  checkRoleAndPermission(["admin", "super_admin","user"], "delete"),
  checkRoleAndPermission(["admin", "super_admin", "user"], "delete"),
  Crud.deleteById
);

module.exports = crudRouter;

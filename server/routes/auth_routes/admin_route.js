const express = require("express");
const authenticate = require("../../controllers/authControllers/Admin_auth");
const authRoute = express.Router();
const adminRouter = express.Router();
const adminController = require("../../controllers/data_controllers/Admin_Controllers");
const {
  checkRoleAndPermission,
} = require("../../middlewares/verifyRole_permission");
adminRouter.get(
  "/all",
  checkRoleAndPermission(["super_admin"], "read"),
  adminController.getAllAdmins
);
adminRouter.get(
  "/:id",
  checkRoleAndPermission(["super_admin"], "read"),
  adminController.getAdminById
);
adminRouter.post(
  "/newAdmin",
  checkRoleAndPermission(["super_admin"], "create"),
  adminController.createAdmin
);
adminRouter.put(
  "/:id",
  checkRoleAndPermission(["super_admin"], "update"),
  adminController.updateAdmin
);
adminRouter.delete(
  "/:id",
  checkRoleAndPermission(["super_admin"], "delete"),
  adminController.deleteAdmin
);
adminRouter.put(
  "/grant_permission/:id",
  checkRoleAndPermission(["super_admin"], "update"),
  adminController.grantPermissions
);

//authRoute.post("/register", authenticate.register);
authRoute.post("/login", authenticate.login);

module.exports = { authRoute, adminRouter };
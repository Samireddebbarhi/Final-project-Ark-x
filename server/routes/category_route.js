<<<<<<< HEAD
<<<<<<< HEAD
=======
=======

>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
const catg_route = require("express").Router();
const catg_controller = require("../controllers/CategoryController");
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

catg_route.get(
<<<<<<< HEAD
=======
  "/getAllCategory",
  // checkRoleAndPermission(["super_admin", "admin", "user"], "read"),
  catg_controller.getAllCategory
);
catg_route.get(
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
  "/getCategory/:id",
  // checkRoleAndPermission(["super_admin", "admin", "user"], "read"),
  catg_controller.getCategory
);
catg_route.post(
  "/addCategory",
  /*checkRoleAndPermission(["super_admin", "admin"], "create"),*/
  catg_controller.addCategory
);
catg_route.put(
  "/updateCategory/:id",
<<<<<<< HEAD
  checkRoleAndPermission(["super_admin", "admin"], "update"),
  catg_controller.updateCategory
);
catg_route.delete(
  "/deleteCategory",
  checkRoleAndPermission(["super_admin", "admin"], "delete"),
=======
   //checkRoleAndPermission(["super_admin", "admin"], "update"),
  catg_controller.updateCategory
);
catg_route.delete(
  "/deleteCategory/:id",
  /*checkRoleAndPermission(["super_admin", "admin"], "delete"),*/
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
  catg_controller.deleteCategory
);

module.exports = catg_route;
<<<<<<< HEAD
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24

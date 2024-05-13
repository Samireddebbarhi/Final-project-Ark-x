const express = require("express");
var RouterProduct = express.Router();
const controller = require("../controllers/ProductController");
//const upload = require("../middlewares/uploadImage");
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

RouterProduct.get(
<<<<<<< HEAD
<<<<<<< HEAD
  "/getAllProducts",
<<<<<<< HEAD
  checkRoleAndPermission(["super_admin", "admin"], "read"),
=======
  "/",
//   checkRoleAndPermission(["super_admin", "admin"])
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
  "/getAllProducts",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
=======
  // checkRoleAndPermission(["super_admin", "admin"], "read"),
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
  controller.getAllProducts
);
<<<<<<< HEAD
RouterProduct.post(
  "/upload",
  upload.single("image"),
  controller.uploadProductImage
);
<<<<<<< HEAD
<<<<<<< HEAD
RouterProduct.get(
  "getProduct/:id",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getProductDetails
);
=======
=======
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
// RouterProduct.get(
//   "getProduct/:id",
//   checkRoleAndPermission(["super_admin", "admin"], "read"),
//   controller.getProductDetails
// );
<<<<<<< HEAD
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
=======
// RouterProduct.post(
//   "/upload",
//   upload.single("image"),
//   controller.uploadProductImage
// );
RouterProduct.get(
  "/getProduct/:id",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getProductDetails
);
>>>>>>> 6226091131c60c2f9ff4afe1ad48997511ac607d
RouterProduct.post(
  "/createProduct",
  checkRoleAndPermission(["super_admin", "admin"], "create"),
  controller.createProduct
);
RouterProduct.put(
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
  "/updateProduct/:id",
  checkRoleAndPermission(["super_admin", "admin"], "update"),
  controller.updateProduct
);
RouterProduct.delete(
  "/deleteAllProducts",
  checkRoleAndPermission(["super_admin", "admin"], "delete"),
  controller.deleteAllProducts
);
RouterProduct.delete(
  "/deleteProduct/:id",
  checkRoleAndPermission(["super_admin", "admin"], "delete"),
<<<<<<< HEAD
=======
  "/:id",
  checkRoleAndPermission(["super_admin", "admin"]),
  controller.updateProduct
);
RouterProduct.delete(
  "/",
  checkRoleAndPermission(["super_admin", "admin"]),
  controller.deleteAllProducts
);
RouterProduct.delete(
  "/:id",
  checkRoleAndPermission(["super_admin", "admin"]),
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
=======
>>>>>>> 49fff52aaa3d806557c0c0d3379b8a03ab7a7940
  controller.deleteProduct
);

module.exports = RouterProduct;

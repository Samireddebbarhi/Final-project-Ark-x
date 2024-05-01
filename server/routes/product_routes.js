const express = require("express");
var RouterProduct = express.Router();
const controller = require("../controllers/ProductController");
const upload = require("../middlewares/uploadImage");
//localhost:3001/api/customer/product
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

RouterProduct.get(
<<<<<<< HEAD
  "/getAllProducts",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
=======
  "/",
//   checkRoleAndPermission(["super_admin", "admin"])
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
  controller.getAllProducts
);
RouterProduct.post(
  "/upload",
  upload.single("image"),
  controller.uploadProductImage
);
<<<<<<< HEAD
RouterProduct.get(
  "/:id",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getProductDetails
);
=======
// RouterProduct.get(
//   "/:id",
//   controller.getProductDetails
// );
>>>>>>> c93456289441c7f9db61ed7010ac24afe484aab8
RouterProduct.post(
  "/createProduct",
  checkRoleAndPermission(["super_admin", "admin"], "create"),
  controller.createProduct
);
RouterProduct.put(
<<<<<<< HEAD
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
  controller.deleteProduct
);

module.exports = RouterProduct;

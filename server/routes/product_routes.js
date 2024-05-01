const express = require("express");
var RouterProduct = express.Router();
const controller = require("../controllers/ProductController");
const upload = require("../middlewares/uploadImage");
//localhost:3001/api/customer/product
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

RouterProduct.get(
  "/getAllProducts",
  // checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getAllProducts
);
RouterProduct.post(
  "/upload",
  upload.single("image"),
  controller.uploadProductImage
);
// RouterProduct.get(
//   "getProduct/:id",
//   checkRoleAndPermission(["super_admin", "admin"], "read"),
//   controller.getProductDetails
// );
RouterProduct.post(
  "/createProduct",
  // checkRoleAndPermission(["super_admin", "admin"], "create"),
  controller.createProduct
);
RouterProduct.put(
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
  controller.deleteProduct
);

module.exports = RouterProduct;

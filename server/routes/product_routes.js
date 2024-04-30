const express = require("express");
var RouterProduct = express.Router();
const controller = require("../controllers/ProductController");
const upload = require("../middlewares/uploadImage");
//localhost:3001/api/customer/product
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

RouterProduct.get(
  "/",
  checkRoleAndPermission(["super_admin", "admin"]),
  controller.getAllProducts
);
RouterProduct.post(
  "/upload",
  upload.single("image"),
  controller.uploadProductImage
);
RouterProduct.get(
  "/:id",
  checkRoleAndPermission(["super_admin", "admin"]),
  controller.getProductDetails
);
RouterProduct.post(
  "/createProduct",
  checkRoleAndPermission(["super_admin", "admin"], "create"),
  controller.createProduct
);
RouterProduct.put(
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
  controller.deleteProduct
);

module.exports = RouterProduct;

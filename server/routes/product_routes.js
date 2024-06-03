const express = require("express");
var RouterProduct = express.Router();
const controller = require("../controllers/ProductController");
//const upload = require("../middlewares/uploadImage");
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

RouterProduct.get(
  "/getAllProducts",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getAllProducts
);
RouterProduct.get("/base/getAllProducts", controller.getAllProducts);

RouterProduct.get("/getProductByKeyword", controller.getProductByKeyword);
RouterProduct.get("/base/getProduct/:id", controller.getProductDetails);
RouterProduct.get(
  "/getProduct/:id",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getProductDetails
);
RouterProduct.post(
  "/createProduct",
  checkRoleAndPermission(["super_admin", "admin"], "create"),
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

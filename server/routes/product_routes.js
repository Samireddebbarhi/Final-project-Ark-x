const express = require("express");
var RouterProduct = express.Router();
const controller = require("../controllers/ProductController");
//localhost:3001/api/customer/product

RouterProduct.get("/", controller.getAllProducts);
RouterProduct.get("/:id", controller.getProductDetails);
RouterProduct.post("/", controller.createProduct);
RouterProduct.put("/:id", controller.updateProduct);
RouterProduct.delete("/", controller.deleteAllProducts);
RouterProduct.delete("/:id", controller.deleteProduct);

module.exports = RouterProduct;
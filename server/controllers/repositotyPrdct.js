const productModel = require("../models/ProductModel");
exports.products = async () => {
  const products = await productModel.find();
  return products;
};
exports.productById = async (id) => {
  const product = await productModel.findById(id);
  return product;
};
exports.createProduct = async (payload) => {
  const newProduct = await productModel.create(payload);
  return newProduct;
};
exports.removeProduct = async (id) => {
  const product = await productModel.findByIdAndRemove(id);
  return product;
};

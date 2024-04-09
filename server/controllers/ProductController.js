const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const getAllProducts = async (req, res, next) => {
  const product = await Product.find();
  if (!product)
    return res
      .status(401)
      .json({ success: false, msg: "No products exists in the database" });
  return res.status(200).json({ succeess: true, product });
};
const createProduct = (req, res) => {
  const product = req.body;
  const categoryName = product.category;
  Category.findOne({ name: categoryName }).then((category) => {
    if (!category) {
      throw new Error(`Category '${categoryName}' not found.`);
    }
    const newProduct = new Product({ ...product, category: category._id });
    newProduct.save().then((newproduct, err) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, msg_erreur: `Error creating product` });
      } else {
        return res.status(201).json({
          success: true,
          msg_success: "The product has been created successfully:",
          data: newproduct,
        });
      }
    });
  });
};

const updateProduct = async (req, res) => {
  try {
    const categoryName = req.body.category;
    const categoryUpdated = await Category.findOne({ name: categoryName });
    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          location: req.body.location,
          category: categoryUpdated ? categoryUpdated._id : null,
          adsplatform: req.body.adsplatform,
          rating: req.body.rating,
        },
      }
    );
    if (updatedProduct.nModified === 0) {
      res.status(404).send("Cannot Update Product with incorrect id");
    } else {
      res.status(200).json({
        success: true,
        msg_success: "updated succefully",
        updated: updatedProduct,
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
const getProductDetails = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json({ success: true, product });
    } else {
      res.status(404).json({ success: false, message: "product not found" });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
};
const deleteProduct = async (req, res, next) => {
  const deleted = await Product.deleteOne({ _id: req.params.id });
  if (!deleted) {
    return res.status(404).json({ success: false, msg: "no such id found" });
  }
  res.status(200).json({
    success: true,
    msg_success: "product is deleted succesfully",
    data: deleted,
  });
};

const deleteAllProducts = async (req, res, next) => {
  try {
    const deleted_product = await Product.deleteMany();

    if (deleted_product.length == 0) {
      return res.status(404).json("no data is available in the database");
    } else {
      res.status(200).json({
        success: true,
        data: "all data has been deleted from the database",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(`Internal server error`);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  deleteAllProducts,
};

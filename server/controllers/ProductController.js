const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");

const getAllProducts = async (req, res, next) => {
  const product = await Product.find().populate("category", "name");
  if (!product)
    return res
      .status(401)
      .json({ success: false, msg: "No products exists in the database" });
  return res.status(200).json({ succeess: true, product });
};
// i update this
const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const categoryId = product.categoryId;

    // Find the category by name
    const category = await Category.findById(categoryId);

    if (!category) {
      throw new Error(`Category ID '${categoryId}' not found.`);
    }

    const newProduct = new Product({
      ...product,
      category: categoryId,
    });

    //Save the product
    await newProduct.save();

    // Push the product ID to the category's products array
    category.products.push(newProduct._id);
    await category.save();

    await category.populate("products");

    return res.status(201).json({
      success: true,
      msg_success: "The product has been created successfully:",
      data: {
        ...newProduct.toObject(),
        categoryName: category.name, // Include category name in the response
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg_error: "Error creating product" });
  }
};
// i update this
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const updatedProduct = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name,
          description,
          price,
          stock,
        },
      }
    );

    if (updatedProduct.nModified === 0) {
      return res.status(404).send("Cannot update product with incorrect id");
    } else {
      return res.status(200).json({
        success: true,
        msg_success: "Updated successfully",
        updated: updatedProduct,
      });
    }
  } catch (err) {
    return res.status(400).send(err.message);
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
const getProductByKeyword = async (req, res, next) => {
  const { keyword, categoryId } = req.query;

  try {
    let products;

    if (categoryId) {
      // Filter by both keyword and category ID
      products = await Product.find({
        name: { $regex: keyword, $options: "i" },
        category: categoryId,
      });
    } else {
      // Only filter by keyword if category ID is not provided
      products = await Product.find({
        name: { $regex: keyword, $options: "i" },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
  getProductByKeyword,
};

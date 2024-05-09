const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Image = require("../models/ImageModel");
const getAllProducts = async (req, res, next) => {
  const product = await Product.find();
  if (!product)
    return res
      .status(400)
      .json({ success: false, msg: "No products exists in the database" });
  return res.status(200).json({ succeess: true, product });
};

const createProduct = async (req, res) => {
  try {
    const product = req.body;
    const categoryName = product.category;

    // Find the category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      throw new Error(`Category '${categoryName}' not found.`);
    }

    const newProduct = new Product({
      ...product,
      category: categoryName,
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
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg_error: "Error creating product" });
  }
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
          description: req.body.description,
          price: req.body.price,
          category: categoryUpdated?.name || null,
          stock: req.body.stock,
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
// Function to upload an image for a product
// const uploadProductImage = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send("No image file uploaded");
//   }

//   const image = new Image({
//     filename: req.file.filename,
//     path: req.file.path,
//   });

//   try {
//     await image.save();
//     res.status(200).send("Image uploaded and saved successfully");
//   } catch (error) {
//     res.status(500).send("Error saving image to the database");
//   }
// };

module.exports = {
  getAllProducts,
  createProduct,
<<<<<<< HEAD

=======
  getProductDetails,
>>>>>>> a85132681e307261995b03843ce68c4ca45f8b70
  updateProduct,
  deleteProduct,
  deleteAllProducts,
 
};

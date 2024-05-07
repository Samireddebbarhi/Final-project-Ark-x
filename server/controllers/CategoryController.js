const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const express = require("express");
const app = express();
app.use(express.json());

const addCategory = async (req, res) => {

  try {
    console.log(req.body);
    const  {name}  = req.body;
    console.log(name);
    const category = new CategoryModel({
      name: name,
    });
    await category.save();
    res.status(200).send("Category added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to add category");
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find()
      .populate({
        path: 'products',
        model: 'Product',
        select: 'name description price' // Add more fields as needed
      })
      .lean(); // To convert Mongoose documents to plain JavaScript objects

    if (!categories || categories.length === 0) {
      return res.status(404).send("No categories exist");
    }

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve categories");
  }
};

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);

    if (!category) {
      res.status(404).send("Category not found");
      return;
    }

    const products = await ProductModel.find({
      _id: { $in: category.products },
    });

    res
      .status(200)
      .json({
        msg_Succes: true,
        Category: category,
        detailedProducts: products,
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve category");
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryId = req.params.id;
    const category = await CategoryModel.findByIdAndUpdate(
      categoryId,
      { name: name },
      { new: true }
    );
    if (!category) {
      res.status(404).send("Category not found");
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to update category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(404).send("Category not found");
    } else {
      res.json(deletedCategory);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to delete category");
  }
};

module.exports = {
  addCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};

const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const express = require("express");
const app = express();
app.use(express.json());

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
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
    const category = await CategoryModel.find();
    if (!category) {
      res.status(404).send("no category exist");
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve category");
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

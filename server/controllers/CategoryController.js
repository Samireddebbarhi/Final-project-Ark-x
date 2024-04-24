const CategoryModel = require("../models/CategoryModel");
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

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      res.status(404).send("Category not found");
    } else {
      res.json(category);
    }
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

module.exports = { addCategory, getCategory, updateCategory, deleteCategory };

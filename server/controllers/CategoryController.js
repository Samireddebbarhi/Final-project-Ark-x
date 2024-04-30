<<<<<<< HEAD
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
=======
const CategoryModel = require('../Models/CategoryModel');
const express = require('express');
const app = express();
app.use(express.json());

const addCategory = async (req,res) => {
  try {
    const {name} = req.body;
    const category = new CategoryModel({
      name: name
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
    });
    await category.save();
    res.status(200).send("Category added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to add category");
  }
};
<<<<<<< HEAD
const getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    if (!category) {
      res.status(404).send("no category exist");
=======

const getCategory = async (req,res) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findById(categoryId);
    if (!category) {
      res.status(404).send("Category not found");
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
    } else {
      res.json(category);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve category");
  }
};
<<<<<<< HEAD
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
=======

const updateCategory = async (req,res) => {
  try {
    const {name} = req.body;
    const categoryId = req.params.id;
    const category = await CategoryModel.findByIdAndUpdate(categoryId, {name: name}, {new: true});
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
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

<<<<<<< HEAD
const deleteCategory = async (req, res) => {
=======
const deleteCategory = async (req,res) => {
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
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

<<<<<<< HEAD
module.exports = {
  addCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
=======
module.exports = { addCategory, getCategory, updateCategory, deleteCategory}; 


>>>>>>> 918275d63eace52fee2029bd92b40557419f189f

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
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
<<<<<<< HEAD
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
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
    });
    await category.save();
    res.status(200).send("Category added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to add category");
  }
};
<<<<<<< HEAD
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
=======
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
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
    }

    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to retrieve categories");
  }
};
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
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
<<<<<<< HEAD
=======

const updateCategory = async (req,res) => {
  try {
    const {name} = req.body;
    const categoryId = req.params.id;
    const category = await CategoryModel.findByIdAndUpdate(categoryId, {name: name}, {new: true});
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
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
<<<<<<< HEAD
const deleteCategory = async (req, res) => {
=======
const deleteCategory = async (req,res) => {
>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
=======
const deleteCategory = async (req, res) => {
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
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
<<<<<<< HEAD
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24
module.exports = {
  addCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
<<<<<<< HEAD
=======
module.exports = { addCategory, getCategory, updateCategory, deleteCategory}; 


>>>>>>> 918275d63eace52fee2029bd92b40557419f189f
=======
>>>>>>> 84e9bf8410621722a931961e62aafb56ee0cbd24

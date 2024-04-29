const CategoryModel = require('../Models/CategoryModel');
const Product = require('../Models/ProductModel');

const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // If the client requests a specific category by ID
    const category = await CategoryModel.findOne({ categoryId }).populate({
      path: 'products'
    });
    if (category.length === 0) {
      return res.status(404).send("Category not found");
    }
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
;




const addCategory = async (req, res) => {
  const category = req.body;
  try {
    const productNames = category.products; 
    if (!productNames || productNames.length === 0) {
      return res.status(400).json({ success: false, message: 'Products array is empty or missing' });
    }
    const productIds = [];
    for (const productName of productNames) {
      const foundProduct = await Product.findOne({ name: productName });
      if (!foundProduct) {
        return res.status(404).json({ success: false, message: `Product ${productName} not found` });
      }
      productIds.push(foundProduct._id); 
    }
    const newcategory = new CategoryModel({
      name: category.name,
      products: productIds,
    });
    await newcategory.save();
    res.status(201).json({
      success: true,
      message: 'category created successfully',
      data: newcategory,
    });
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding order',
      error: error.message,
    });
  }
};


const updateCategory = async (req,res) => {
  try {
    const {name} = req.body;
    const categoryId = req.params.id;
    const category = await CategoryModel.findByIdAndUpdate(categoryId, {name: name}, {new: true});
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
const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate('products');
    console.log(categories)  
    if (!categories || categories.length === 0) {
      return res.status(404).send("Categories not found");
    }
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteCategory = async (req,res) => {
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

module.exports = { addCategory, getCategory, updateCategory, deleteCategory, getAllCategories}; 



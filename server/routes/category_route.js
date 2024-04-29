const express = require('express');
const categoryRouter = express.Router();
const { addCategory, getCategory, updateCategory, deleteCategory, getAllCategories } = require('../controllers/CategoryController');

categoryRouter.post('/', addCategory);

categoryRouter.get('/:id', getCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.get('/all', getAllCategories)

module.exports = categoryRouter;
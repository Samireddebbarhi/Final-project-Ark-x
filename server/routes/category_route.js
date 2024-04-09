const express = require('express');
const categoryRouter = express.Router();
const { addCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/CategoryController');

categoryRouter.post('/', addCategory);

categoryRouter.get('/:id', getCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

module.exports = categoryRouter;

const express = require('express');
const categoryRouter = express.Router();
const { addCategory, getCategory, updateCategory, deleteCategory, getAllCategories } = require('../controllers/CategoryController');

categoryRouter.post('/', addCategory);

categoryRouter.get('/:id', getCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.get('/all', getAllCategories)

module.exports = categoryRouter;
const catg_route = require("express").Router();
const catg_controller = require("../controllers/CategoryController");
const {
  checkRoleAndPermission,
} = require("../middlewares/verifyRole_permission");

catg_route.get(
  "/getCategory/:id",
  checkRoleAndPermission(["super_admin", "admin", "user"], "read"),
  catg_controller.getCategory
);
catg_route.post(
  "/addCategory",
  checkRoleAndPermission(["super_admin", "admin"], "create"),
  catg_controller.addCategory
);
catg_route.put(
  "/updateCategory",
  checkRoleAndPermission(["super_admin", "admin"], "update"),
  catg_controller.updateCategory
);
catg_route.delete(
  "/deleteCategory",
  checkRoleAndPermission(["super_admin", "admin"], "delete"),
  catg_controller.deleteCategory
);

module.exports = catg_route;

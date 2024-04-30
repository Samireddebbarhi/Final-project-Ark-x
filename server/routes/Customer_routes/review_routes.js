const route = require("express").Router();
const {
  checkRoleAndPermission,
} = require("../../middlewares/verifyRole_permission");
const controller = require("../../controllers/ReviewController");

route.get(
  "/getAllReview",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getAllReviews
);
//add review to product
route.post(
  "/addProductReview",
  checkRoleAndPermission(["user"], "create"),
  controller.addReview
);

route.get(
  "/getReview/:id",
  checkRoleAndPermission(["user"], "read"),
  controller.getReviewById
);

route.put(
  "updateReview/:id",
  checkRoleAndPermission(["user"], "update"),
  controller.getReviewById
);

module.exports = route;

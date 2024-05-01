const route = require("express").Router();
const {
  checkRoleAndPermission,
} = require("../../middlewares/verifyRole_permission");
const controller = require("../../controllers/ReviewController");

route.get(
  "/getAllReviews",
  checkRoleAndPermission(["super_admin", "admin"], "read"),
  controller.getAllReviews
);
//add review to product
route.post(
  "/addProductReview/:id",
  checkRoleAndPermission(["user"], "create"),
  controller.addReview
);

route.get(
  "/getReview/:id",
  checkRoleAndPermission(["super_admin", "admin", "user"], "read"),
  controller.getReviewById
);

route.put(
  "/updateReview/:id",
  checkRoleAndPermission(["user"], "update"),
  controller.getReviewById
);
route.delete(
  "/deleteReview/:id",
  checkRoleAndPermission(["user"], "delete"),
  controller.deleteReview
);
module.exports = route;

const router = require("express").Router();
const cartController = require("../controllers/CartController");
router.post("/add", cartController.addItemToCart);
router.get("/get", cartController.getCart);
router.delete("/empty-cart", cartController.emptyCart);
module.exports = router;

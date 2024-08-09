const express = require("express");
const {
  addItemToCart,
  removeItemFromCart,
  getCart,
  updateItemQuantity,
  applyDiscount,
} = require("../controllers/shoppingCartController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); 

router.post("/items", addItemToCart);
router.delete("/items/:productId", removeItemFromCart);
router.get("/", getCart);
router.put("/items", updateItemQuantity);
router.post("/discount", applyDiscount);

module.exports = router;

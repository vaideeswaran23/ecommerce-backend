const express = require("express");
const {
  createDiscount,
  getDiscounts,
  getDiscountById,
  updateDiscount,
  deleteDiscount,
} = require("../controllers/discountController");
const { isAdmin, authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware); 
router.use(isAdmin); 

router.post("/", createDiscount);
router.get("/", getDiscounts);
router.get("/:id", getDiscountById);
router.put("/:id", updateDiscount);
router.delete("/:id", deleteDiscount);

module.exports = router;

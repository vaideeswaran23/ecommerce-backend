const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/productController");
const { isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);
router.get("/", getProducts);

module.exports = router;

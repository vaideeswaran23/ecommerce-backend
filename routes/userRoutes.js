const express = require("express");
const {
  getUserInfo,
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  getOrders,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/me", getUserInfo);
router.post("/:userId/addresses", addAddress);
router.put("/:userId/addresses/:addressId", updateAddress);
router.delete("/:userId/addresses/:addressId", deleteAddress);
router.get("/:userId/addresses", getAddresses);
router.get("/orders", getOrders);

module.exports = router;

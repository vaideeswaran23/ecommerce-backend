const express = require("express");
const {
  checkout,
  paymentCallback,
} = require("../controllers/checkoutController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);
router.post("/payment/callback", paymentCallback);

module.exports = router;

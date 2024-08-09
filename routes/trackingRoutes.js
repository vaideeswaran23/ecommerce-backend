const express = require("express");
const { updateTracking } = require("../controllers/trackingController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(isAdmin);

router.put("/orders/:orderId", updateTracking);

module.exports = router;

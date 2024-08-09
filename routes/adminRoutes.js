const express = require("express");
const { adminSignin, adminSignup } = require("../controllers/adminController");
const router = express.Router();

router.post("/signin", adminSignin);
router.post("/signup", adminSignup);

module.exports = router;

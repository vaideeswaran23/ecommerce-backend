const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "xxxxxx";

exports.authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "Access denied" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const admin = await Admin.findById(decoded.userId);

    if (!admin || !decoded.isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

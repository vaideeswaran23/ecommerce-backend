const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "xxxx";

exports.adminSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: admin._id, isAdmin: true }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.adminSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { username }],
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      passwordHash: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

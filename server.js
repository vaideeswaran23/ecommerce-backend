const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const shoppingCartRoutes = require("./routes/shoppingCartRoutes");
const discountRoutes = require("./routes/discountRoutes");
const orderRoutes = require("./routes/orderRoutes");
const trackingRoutes = require("./routes/trackingRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", shoppingCartRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/tracking", trackingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

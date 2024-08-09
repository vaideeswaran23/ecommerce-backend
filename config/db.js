const mongoose = require("mongoose");
require("dotenv").config();

console.log(process.env.MONGO_URI);

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://xxx:xxxx@xxx.xxx.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=xxx";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

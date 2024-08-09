const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  addresses: [
    {
      addressLine1: {
        type: String,
        required: true,
      },
      addressLine2: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  ],
  orderHistory: [
    {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
      orderDate: {
        type: Date,
        default: Date.now,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);

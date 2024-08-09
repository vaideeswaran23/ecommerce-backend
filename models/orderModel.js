const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderDate: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" },
    totalAmount: { type: Number, required: true },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: false },
      },
    ],
    shippingAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentDetails: {
      paymentMethod: { type: String },
      paymentStatus: { type: String },
      transactionId: { type: String },
    },
    tracking: {
      dispatchDate: { type: Date },
      deliveryDate: { type: Date },
      currentStatus: { type: String },
      carrier: { type: String },
      trackingNumber: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ShoppingCart = require("../models/shoppingCartModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");

const razorpay = new Razorpay({
  key_id: "YOUR_RAZORPAY_KEY_ID",
  key_secret: "YOUR_RAZORPAY_KEY_SECRET",
});

exports.checkout = async (req, res) => {
  try {
    const { cartId, addressId, userId } = req.body;

    const user = await User.findOne(
      { _id: userId, "addresses._id": addressId },
      { "addresses.$": 1 }
    ).exec();

    let address = "";

    if (user) {
      address = user.addresses[0];
    } else {
      console.log("Address not found");
      return res.status(400).json({ message: "Invalid address ID" });
    }
    console.log(address);
    const cart = await ShoppingCart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const order = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalPrice,
      shippingAddress: address,
      status: "Pending",
    });

    console.log(order);

    const updatedOrder = await order.save();

    // Create Razorpay order
    // const razorpayOrder = await razorpay.orders.create({
    //   amount: order.totalAmount * 100, // amount in paisa
    //   currency: "INR",
    //   receipt: order._id.toString(),
    // });

    const razorpayOrder = {
      id: crypto.randomUUID(),
      amount: order.totalAmount * 100,
      currency: "INR",
      receipt: order._id.toString(),
    };

    res.status(200).json({
      order: updatedOrder,
      razorpayOrderId: razorpayOrder.id,
      amount: order.totalAmount,
      currency: "INR",
      razorpayOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.paymentCallback = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const body = orderId + "|" + paymentId;
  // const expectedSignature = crypto
  //   .createHmac("sha256", "YOUR_RAZORPAY_KEY_SECRET")
  //   .update(body.toString())
  //   .digest("hex");

  const expectedSignature = "vaidee";

  if (signature !== expectedSignature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  const order = await Order.findById(orderId);
  if (order) {
    order.paymentDetails = {
      paymentMethod: "Razorpay",
      paymentStatus: "Completed",
      transactionId: paymentId,
    };
    order.status = "Completed";
    await order.save();
  }

  res.status(200).json({ message: "Payment successful", order });
};

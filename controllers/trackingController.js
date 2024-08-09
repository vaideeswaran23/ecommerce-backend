const Order = require("../models/orderModel");

exports.updateTracking = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const {
      dispatchDate,
      deliveryDate,
      currentStatus,
      carrier,
      trackingNumber,
    } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.tracking = {
      dispatchDate,
      deliveryDate,
      currentStatus,
      carrier,
      trackingNumber,
    };

    await order.save();
    res.status(200).json({ message: "Tracking info updated", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

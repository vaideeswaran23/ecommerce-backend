const User = require("../models/userModel");
const Order = require("../models/orderModel");

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.addAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { addressLine1, addressLine2, city, state, zipCode, country } =
      req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          addresses: {
            addressLine1,
            addressLine2,
            city,
            state,
            zipCode,
            country,
          },
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Address added successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    const { addressLine1, addressLine2, city, state, zipCode, country } =
      req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId, "addresses._id": addressId },
      {
        $set: {
          "addresses.$.addressLine1": addressLine1,
          "addresses.$.addressLine2": addressLine2,
          "addresses.$.city": city,
          "addresses.$.state": state,
          "addresses.$.zipCode": zipCode,
          "addresses.$.country": country,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Address not found" });
    }

    res
      .status(200)
      .json({ message: "Address updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const addressId = req.params.addressId;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User or address not found" });
    }

    res
      .status(200)
      .json({ message: "Address deleted successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const orders = await Order.find({ userId: userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

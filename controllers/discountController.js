const Discount = require("../models/discountModel");

exports.createDiscount = async (req, res) => {
  try {
    const { code, description, amount, type, startDate, endDate } = req.body;

    const discount = new Discount({
      code,
      description,
      amount,
      type,
      startDate,
      endDate,
    });

    await discount.save();
    res
      .status(201)
      .json({ message: "Discount created successfully", discount });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discount.findById(id);
    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, description, amount, type, startDate, endDate } = req.body;

    const discount = await Discount.findByIdAndUpdate(
      id,
      {
        code,
        description,
        amount,
        type,
        startDate,
        endDate,
      },
      { new: true }
    );

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res
      .status(200)
      .json({ message: "Discount updated successfully", discount });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const { id } = req.params;
    const discount = await Discount.findByIdAndDelete(id);

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    res.status(200).json({ message: "Discount deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const ShoppingCart = require("../models/shoppingCartModel");
const Product = require("../models/productModel");
const Discount = require("../models/discountModel");

exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await ShoppingCart.findOne({ userId });
    if (!cart) {
      cart = new ShoppingCart({ userId });
    }

    const existingItem = cart.items.find((item) =>
      item.productId.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.discountCode = null;

    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * product.price;
    }, 0);

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const cart = await ShoppingCart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    cart.totalPrice = cart.items.reduce(async (total, item) => {
      const product = await Product.findById(item.productId);
      return total + item.quantity * product.price;
    }, 0);

    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await ShoppingCart.findOne({ userId }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;

    const cart = await ShoppingCart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((item) => item.productId.equals(productId));
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;

    cart.discountCode = null;

    let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    cart.totalPrice = totalPrice;

    await cart.save();
    res.status(200).json({ message: "Item quantity updated", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.applyDiscount = async (req, res) => {
  try {
    const { cartId, discountCode } = req.body;

    const cart = await ShoppingCart.findById(cartId).populate(
      "items.productId"
    );
    const discount = await Discount.findOne({ code: discountCode });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (!discount) {
      return res.status(404).json({ message: "Discount not found" });
    }

    const now = new Date();
    if (now < discount.startDate || now > discount.endDate) {
      return res
        .status(400)
        .json({ message: "Discount has expired or is not yet valid" });
    }

    let totalPrice = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }

    let discountAmount = 0;
    if (discount.type === "percentage") {
      discountAmount = totalPrice * (discount.amount / 100);
    } else if (discount.type === "fixed") {
      discountAmount = discount.amount;
    }

    const discountedPrice = totalPrice - discountAmount;

    cart.discountCode = discountCode;
    cart.totalPrice = discountedPrice;

    await cart.save();

    res
      .status(200)
      .json({ message: "Discount applied and cart updated", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

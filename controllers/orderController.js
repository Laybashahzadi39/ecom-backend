import Order from "../models/order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";
import User from "../models/User.js";

// Admin: Order ka status change karna
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// cart se order banana (checkout) - sirf selected items ka
const placeOrder = async (req, res) => {
  try {
    const { selectedProductIds } = req.body; // frontend se selected items ki IDs aayengi

    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // cart k items ko 2 groups mein baantna - jo order krne hain, jo cart mein rehne hain
    const itemsToOrder = [];
    const itemsToKeepInCart = [];

    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      const isSelected = selectedProductIds.includes(item.product._id.toString());

      if (isSelected) {
        itemsToOrder.push(item);
      } else {
        itemsToKeepInCart.push(item);
      }
    }

    if (itemsToOrder.length === 0) {
      return res.status(400).json({ message: "Please select at least one item to order" });
    }

    // order ke items banana, aur total calculate karna
    const orderItems = [];
    let totalAmount = 0;

    for (let i = 0; i < itemsToOrder.length; i++) {
      const item = itemsToOrder[i];
      orderItems.push({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      });
      totalAmount = totalAmount + item.product.price * item.quantity;

      // stock kam karo (product usable stock mein se)
      item.product.stock = item.product.stock - item.quantity;
      await item.product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: totalAmount,
    });

    // cart mein sirf wo items rakho jo select nahi hue the
    cart.items = itemsToKeepInCart;
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user apne sare orders dekh sake
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.product");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ADMIN k liye - sab users k sare orders dekhna
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .populate("user");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };
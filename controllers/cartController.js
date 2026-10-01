import Cart from "../models/Cart.js";

// user ka cart lana ,agar nahi hai to khali cart bana do
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cart mein product add karna
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // check karo ye product pehle se cart mein hai kya
    let itemFound = false;
    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].product.toString() === productId) {
        cart.items[i].quantity = cart.items[i].quantity + quantity;
        itemFound = true;
      }
    }

    if (!itemFound) {
      cart.items.push({ product: productId, quantity: quantity });
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// quantity update karna (+/- ke liye)
const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    for (let i = 0; i < cart.items.length; i++) {
      if (cart.items[i].product.toString() === productId) {
        cart.items[i].quantity = quantity;
      }
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cart se item remove karna
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);

    await cart.save();
    const updatedCart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCart, addToCart, updateCartItem, removeFromCart };
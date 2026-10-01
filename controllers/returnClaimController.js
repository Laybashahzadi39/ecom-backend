import ReturnClaim from "../models/ReturnClaim.js";
import Product from "../models/product.js";
import User from "../models/User.js";

// naya return/exchange request banana
const createReturnClaim = async (req, res) => {
  try {
    const { orderId, productId, type, reason, condition, quantity } = req.body;

    // request ko database mein save karna
    const returnClaim = await ReturnClaim.create({
      user: req.user._id,
      order: orderId,
      product: productId,
      type: type,
      reason: reason,
      condition: condition,
      quantity: quantity,
    });

    // ab product ka stock update karna hai, condition k hisab se
    const product = await Product.findById(productId);

    if (condition === "usable") {
      // usable hai to wapas normal stock mein add kr do
      product.stock = product.stock + quantity;
    } else {
      // damaged hai to damagedStock mein add kr do
      product.damagedStock = product.damagedStock + quantity;
    }

    await product.save();

    res.status(201).json(returnClaim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// user apni sari return/claim requests dekh sake
const getMyReturnClaims = async (req, res) => {
  try {
    const claims = await ReturnClaim.find({ user: req.user._id })
      .populate("product")
      .populate("order");

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ADMIN k liye - sab users ki return/claim requests dekhna
const getAllReturnClaims = async (req, res) => {
  try {
    const claims = await ReturnClaim.find()
      .populate("product")
      .populate("order")
      .populate("user"); // kis user ne request ki, uska naam bhi dikhega

    res.status(200).json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN k liye - status update karna (approve/reject)
const updateReturnClaimStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const claim = await ReturnClaim.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );

    if (!claim) {
      return res.status(404).json({ message: "Return/Claim request not found" });
    }

    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReturnClaim, getMyReturnClaims, getAllReturnClaims, updateReturnClaimStatus };
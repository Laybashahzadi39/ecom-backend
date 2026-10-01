import User from "../models/User.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import ReturnClaim from "../models/ReturnClaim.js";

// admin dashboard k cards k lye sara data ek sath bhejna
const getAnalytics = async (req, res) => {
  try {
    // sirf normal customers ginne hain, admin ko nahi
    const totalCustomers = await User.countDocuments({ role: "user" });

    // kitne orders hue aur kitne products hain
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    // wo return requests jinka admin ne abhi faisla nahi kiya
    const pendingReturns = await ReturnClaim.countDocuments({ status: "pending" });

    // revenue: sare orders ka totalAmount jod diya
    const allOrders = await Order.find();
    let totalRevenue = 0;
    for (let i = 0; i < allOrders.length; i++) {
      totalRevenue = totalRevenue + allOrders[i].totalAmount;
    }

    // low stock aur out of stock products ginna
    const allProducts = await Product.find();
    let lowStockCount = 0;
    let outOfStockCount = 0;

    for (let i = 0; i < allProducts.length; i++) {
      const p = allProducts[i];

      // purane products mein threshold na ho to 10 maan lo
      const threshold = p.lowStockThreshold || 10;

      if (p.stock === 0) {
        outOfStockCount = outOfStockCount + 1;
      } else if (p.stock < threshold) {
        lowStockCount = lowStockCount + 1;
      }
    }

    // sirf numbers wapas bhej diye, koi customer ka data nahi
    res.status(200).json({
      totalCustomers: totalCustomers,
      totalOrders: totalOrders,
      totalProducts: totalProducts,
      totalRevenue: totalRevenue,
      pendingReturns: pendingReturns,
      lowStockCount: lowStockCount,
      outOfStockCount: outOfStockCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAnalytics };
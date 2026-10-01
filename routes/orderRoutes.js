import express from "express";
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus} from "../controllers/orderController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const orderRouter = express.Router();

orderRouter.post("/place", protect, placeOrder);
orderRouter.get("/my-orders", protect, getMyOrders);
orderRouter.get("/all", protect, isAdmin, getAllOrders);
orderRouter.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default orderRouter;
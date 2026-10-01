import express from "express";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../controllers/cartController.js";
import protect from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

// sare cart routes protected hain (login zaroori hai)
cartRouter.get("/", protect, getCart);
cartRouter.post("/add", protect, addToCart);
cartRouter.put("/update", protect, updateCartItem);
cartRouter.delete("/remove/:productId", protect, removeFromCart);

export default cartRouter;
import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistController.js";
import protect from "../middleware/authMiddleware.js";

const wishlistRouter = express.Router();

// sare routes protected hain (login zaroori hai)
wishlistRouter.get("/", protect, getWishlist);
wishlistRouter.post("/add", protect, addToWishlist);
wishlistRouter.delete("/remove/:productId", protect, removeFromWishlist);

export default wishlistRouter;
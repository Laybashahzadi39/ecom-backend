import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const analyticsRouter = express.Router();

// sirf login wala admin hi ye numbers dekh sakta hai
analyticsRouter.get("/summary", protect, isAdmin, getAnalytics);

export default analyticsRouter;
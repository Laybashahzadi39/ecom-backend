import express from "express";
import { recordVisit, getVisitStats } from "../controllers/visitController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const visitRouter = express.Router();

visitRouter.post("/", recordVisit);
visitRouter.get("/stats", protect, isAdmin, getVisitStats);

export default visitRouter;
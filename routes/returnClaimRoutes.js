import express from "express";
import {
  createReturnClaim,
  getMyReturnClaims,
  getAllReturnClaims,
  updateReturnClaimStatus,
} from "../controllers/returnClaimController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const returnClaimRouter = express.Router();

// user k liye
returnClaimRouter.post("/", protect, createReturnClaim);
returnClaimRouter.get("/my-claims", protect, getMyReturnClaims);

// admin k liye
returnClaimRouter.get("/all", protect, isAdmin, getAllReturnClaims);
returnClaimRouter.put("/:id/status", protect, isAdmin, updateReturnClaimStatus);

export default returnClaimRouter;
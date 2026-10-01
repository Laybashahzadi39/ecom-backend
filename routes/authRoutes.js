import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const authRouter = express.Router();

// Register API
authRouter.post("/register", registerUser);

// Login API
authRouter.post("/login", loginUser);

export default authRouter;
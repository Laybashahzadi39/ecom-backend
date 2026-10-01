import express from "express";
import {
  getAllSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/subCategoryController.js";
import protect from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/adminMiddleware.js";

const subCategoryRouter = express.Router();

// GET - public (sab dekh skty, ya category k hisab se filter b)
subCategoryRouter.get("/", getAllSubCategories);

// POST - sirf admin
subCategoryRouter.post("/", protect, isAdmin, createSubCategory);

// PUT - sirf admin
subCategoryRouter.put("/:id", protect, isAdmin, updateSubCategory);

// DELETE - sirf admin
subCategoryRouter.delete("/:id", protect, isAdmin, deleteSubCategory);

export default subCategoryRouter;
import express from "express"; 
import {getAllCategories,createCategory,updateCategory, deleteCategory,} from "../controllers/categoryController.js"; 
import protect from "../middleware/authMiddleware.js"
import isAdmin from "../middleware/adminMiddleware.js"; 

const categoryRouter = express.Router(); // router bnaya

// GET all categories 
categoryRouter.get("/", getAllCategories);

// POST nai category - 
categoryRouter.post("/", protect, isAdmin, createCategory);

// PUT category update 
categoryRouter.put("/:id", protect, isAdmin, updateCategory);

// DELETE category 
categoryRouter.delete("/:id", protect, isAdmin, deleteCategory);

export default categoryRouter;
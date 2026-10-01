import express from "express"; // router banane k lye
import {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,} from "../controllers/productController.js"; 
import protect from "../middleware/authMiddleware.js"; // login check
import isAdmin from "../middleware/adminMiddleware.js"; // admin check

const productRouter = express.Router(); // router bnaya

// GET sb products - public (koi b dekh skta h)
productRouter.get("/", getAllProducts);

// GET single product by id - public
productRouter.get("/:id", getProductById);

// POST naya product - sirf login + admin
productRouter.post("/", protect, isAdmin, createProduct);

// PUT product update - sirf login + admin
productRouter.put("/:id", protect, isAdmin, updateProduct);

// DELETE product - sirf login + admin
productRouter.delete("/:id", protect, isAdmin, deleteProduct);

export default productRouter; // export kia




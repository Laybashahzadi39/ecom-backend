import express from 'express'
import dotenv from 'dotenv'
import Connectdb from './config/db.js'
import authRouter from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js"; 
import orderRouter from "./routes/orderRoutes.js";
import cors from "cors";
import subCategoryRouter from "./routes/subCategoryRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import returnClaimRouter from "./routes/returnClaimRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import analyticsRouter from "./routes/analyticsRoutes.js";
import visitRouter from "./routes/visitRoutes.js";

dotenv.config()
const port = 3000
const app = express()
app.use(cors());
// Database Connect
Connectdb();

app.use(express.json())


app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter); 
app.use("/api/products", productRouter); 
app.use("/api/subcategories", subCategoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/returns", returnClaimRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/visits", visitRouter);
// app listner
app.listen(port, () => {
    console.log(`server is working ${port}`)
})
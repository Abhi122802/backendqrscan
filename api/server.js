import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.js";
import qrcodeRoutes from "../routes/qrcodeRoutes.js";

dotenv.config();
const app = express();

// It's a good practice to call connectDB inside an async function
// or ensure your handlers wait for the connection.
// For Vercel, the improved connectDB handles this caching.
connectDB();

app.use(cors());
app.use(express.json());

// Root handler
app.get("/", (req, res) => {
  res.send("QR Backend is running!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/qrcodes", qrcodeRoutes);

export default app;

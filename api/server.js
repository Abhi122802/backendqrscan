import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.js"; 
import qrcodeRoutes from "../routes/qrcodeRoutes.js"; // Handles /api/qrcodes/*
import { handleScan } from "../controllers/qrcodeController.js"; // Import the scan handler

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
// This route specifically handles the scan event from a QR code.
// It's separate from qrcodeRoutes because the URL is /api/scan/:id
app.get("/api/scan/:id", handleScan);

export default app;

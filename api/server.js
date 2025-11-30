import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.js"; 
import qrcodeRoutes from "../routes/qrcodeRoutes.js"; // Handles /api/qrcodes/*
import { handleScan } from "../controllers/qrcodeController.js"; // Import the scan handler

dotenv.config();
const app = express();
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

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    await connectDB(); // Wait for the database connection to succeed
    app.listen(PORT, () => {
      console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
export default app;

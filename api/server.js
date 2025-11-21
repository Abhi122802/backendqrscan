import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "../routes/auth.js";
import qrcodeRoutes from "../routes/qrcodeRoutes.js";
import { verifyQRCode } from "../controllers/qrcodeController.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Root handler
app.get("/", (req, res) => {
  res.send("QR Backend is running!");
});

// Middleware to ensure DB connection for API routes
const ensureDbConnection = async (req, res, next) => {
  await connectDB();
  next();
};

// Routes
app.use("/api/auth", ensureDbConnection, authRoutes);
app.use("/api/qrcodes", ensureDbConnection, qrcodeRoutes);
app.post("/api/qrcodes/verify", verifyQRCode); // Add the verification route

export default app;

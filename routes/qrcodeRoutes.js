import express from "express";
import { createQRCode, getAllQRCodes } from "../controllers/qrcodeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/qrcodes - Get all QR Codes
router.get("/", getAllQRCodes);

// POST /api/qrcodes - Create a new QR Code
router.post("/", createQRCode);

export default router;
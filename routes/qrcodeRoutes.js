import express from "express";
import { createQRCode } from "../controllers/qrcodeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/qrcodes - Create a new QR Code
router.post("/", createQRCode);

export default router;
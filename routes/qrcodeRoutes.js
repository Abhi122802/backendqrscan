import express from "express";
import {
  createQRCodes,
  verifyQRCode,
} from "../controllers/qrcodeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createQRCodes);
router.post("/verify", verifyQRCode); // Add this line to activate the route

export default router;
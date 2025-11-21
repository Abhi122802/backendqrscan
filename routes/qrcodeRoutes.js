import express from "express";
import { createQRCodes } from "../controllers/qrcodeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createQRCodes);

export default router;
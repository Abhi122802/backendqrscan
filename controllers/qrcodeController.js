import QRCodeModel from "../models/QRCode.js";
import { response } from "../utils/helpers.js";

export const verifyQRCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return response(res, 400, "QR code is required.");
    }

    const qr = await QRCodeModel.findOne({ code });

    if (!qr) return response(res, 404, "QR code not found or is invalid.");

    return response(res, 200, "QR code verified.", { status: qr.status });
  } catch (e) {
    console.error("Verify QR Code Error:", e);
    return response(res, 500, "Server error during QR code verification.");
  }
};

import QRCode from "../models/QRCode.js";
import { response } from "../utils/helpers.js";
import { v4 as uuidv4 } from "uuid";
import qr from "qrcode";

export const createQRCode = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data) {
      return response(res, 400, "QR code data is required.");
    }

    const id = uuidv4();
    // Generate QR code as a data URL
    const url = await qr.toDataURL(data);

    const qrCode = await QRCode.create({
      id, // The user field is now optional
      url,
    });

    return response(res, 201, "QR Code created successfully!", { qrCode });
  } catch (error) {
    console.error("QR Code Creation Error:", error);
    return response(res, 500, "Server error during QR code creation.");
  }
};
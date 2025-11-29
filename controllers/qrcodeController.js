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

export const getAllQRCodes = async (req, res) => {
  try {
    // Find all QR codes and sort them by creation date in descending order (newest first)
    const qrCodes = await QRCode.find({}).sort({ createdAt: -1 });
    return response(res, 200, "Successfully retrieved all QR codes.", { qrCodes });
  } catch (error) {
    console.error("Get All QR Codes Error:", error);
    return response(res, 500, "Server error while fetching QR codes.");
  }
};
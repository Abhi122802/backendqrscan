import QRCode from "../models/QRCode.js";
import { response } from "../utils/helpers.js";

/**
 * @desc    Create new QR codes in bulk
 * @route   POST /api/qrcodes
 * @access  Private
 */
export const createQRCodes = async (req, res) => {
  try {
    const qrCodesData = req.body; // Array of QR codes from frontend
    const userId = req.user._id; // from auth middleware

    if (!Array.isArray(qrCodesData) || qrCodesData.length === 0) {
      return response(res, 400, "QR code data must be a non-empty array.");
    }

    // Add the createdBy field to each QR code object
    const qrCodesToSave = qrCodesData.map((qr) => ({
      qrId: qr.id,
      url: qr.url,
      status: qr.status || "inactive",
      createdBy: userId,
    }));

    // Use insertMany for efficient bulk insertion
    const createdQRCodes = await QRCode.insertMany(qrCodesToSave);

    return response(
      res,
      201,
      `${createdQRCodes.length} QR codes created successfully.`
    );
  } catch (error) {
    console.error("Error creating QR codes:", error);
    return response(res, 500, "Server error while creating QR codes.");
  }
};
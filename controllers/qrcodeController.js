import QRCode from "../models/QRCode.js";
import { response } from "../utils/helpers.js";
import { v4 as uuidv4 } from "uuid";
import QRScan from "../models/QRScan.js";
import qr from "qrcode";

export const createQRCode = async (req, res) => {
  try {
    // The 'data' from the client can be used for internal reference,
    // but the QR code itself should point to our API.
    const { originalData } = req.body;

    if (!originalData) {
      return response(res, 400, "Original data for QR code is required.");
    }

    const id = uuidv4();
    // The URL the QR code will contain. When scanned, it will hit our backend.
    // Ensure you set BASE_URL in your environment variables on Render.
    const scanUrl = `${process.env.BASE_URL}/api/scan/${id}`;

    // Generate QR code as a data URL
    const qrImageUrl = await qr.toDataURL(scanUrl);

    const qrCode = await QRCode.create({
      id, // The unique ID for this QR code
      url: originalData, // Store the original intended data/url
      // We don't need to store the generated image data URL in the DB
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

export const handleScan = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the QR code by its unique ID
    const qrCode = await QRCode.findOne({ id });

    if (!qrCode) {
      // If no QR code is found, return a 404 error.
      return response(res, 404, "QR Code not found.");
    }

    // 2. Record the scan event in the database.
    // We link the scan to the QRCode's document _id.
    await QRScan.create({ qrCode: qrCode._id });

    // 3. Redirect the user to the original URL.
    // The browser that scanned the code will be sent to the destination.
    return res.redirect(302, qrCode.url);

  } catch (error) {
    console.error("QR Code Scan Error:", error);
    // Provide a user-friendly error page or message if something goes wrong
    return res.status(500).send("<h1>Error: Could not process QR code</h1>");
  }
};
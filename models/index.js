import dbConnect from "../../../lib/dbConnect";
import QRCode from "../../../models/QRCode";
import QRScan from "../../../models/QRScan";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { id } = req.body;

        if (!id) {
          return res.status(400).json({ success: false, error: "QR code ID is required." });
        }

        // Find the QR code by its custom 'id' field
        const qrCode = await QRCode.findOne({ id });

        if (!qrCode) {
          return res.status(404).json({ success: false, error: "QR Code not found." });
        }

        // Create a new scan record, referencing the found QR code's _id
        const qrScan = await QRScan.create({
          qrCode: qrCode._id,
          status: "scanned",
        });

        // Respond with the new scan data and include the original QR code's URL
        res.status(201).json({
          success: true,
          data: qrScan,
          url: qrCode.url, // Include the URL from the found QR code
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
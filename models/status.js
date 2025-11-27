import dbConnect from "../../../../lib/dbConnect";
import QRCode from "../../../../models/QRCode";
import QRScan from "../../../../models/QRScan";
import { getSession } from "next-auth/react"; // Or your auth solution

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  // This is a placeholder for getting the authenticated user.
  // Replace this with your actual authentication logic.
  // For example, using next-auth:
  const session = await getSession({ req });
  if (!session || !session.user || !session.user.id) {
    return res.status(403).json({
      message: "Forbidden. You must be logged in to perform this action.",
    });
  }
  const userId = session.user.id;

  await dbConnect();

  if (method === "PATCH") {
    try {
      const { status } = body;
      if (!["activate", "deactivate"].includes(status)) {
        return res.status(400).json({ message: "Invalid status provided." });
      }

      // The frontend sends 'deactivate', but the model stores 'deactivated'.
      const newStatus = status === "deactivate" ? "deactivated" : "active";

      const qrCode = await QRCode.findOne({ qrId: id });

      if (!qrCode) {
        return res.status(404).json({ message: "QR Code not found." });
      }

      qrCode.status = newStatus;
      await qrCode.save();

      // Create a log of the scan event
      await QRScan.create({
        qrCode: qrCode._id,
        scannedBy: userId,
        action: status, // 'activate' or 'deactivate'
      });

      res.status(200).json({ success: true, data: qrCode });
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
import QRCodeModel from "../models/QRCode.js";

export const verifyQRCode = async (req, res) => {
  try {
    const { code } = req.body;

    const qr = await QRCodeModel.findOne({ code });

    if (!qr)
      return res.json({ status: "inactive", message: "QR not found" });

    res.json({
      status: qr.status,
      message: "QR found",
      qr
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

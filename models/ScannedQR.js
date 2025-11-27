import mongoose from "mongoose";

const scannedQRSchema = new mongoose.Schema(
  {
    qrCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QRCode",
      required: true,
    },
    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      enum: ["activate", "deactivate"],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ScannedQR || mongoose.model("ScannedQR", scannedQRSchema);
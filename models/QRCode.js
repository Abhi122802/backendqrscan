import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    qrId: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String, // This will store the data URL of the QR code image
      required: true,
    },
    status: {
      type: String,
      enum: ["inactive", "active", "expired"],
      default: "inactive",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("QRCode", qrCodeSchema);
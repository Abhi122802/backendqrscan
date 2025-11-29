import mongoose from "mongoose";

const qrScanSchema = new mongoose.Schema(
  {
    qrCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QRCode",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["scanned"],
      default: "scanned",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Mongoose will create a collection named 'qrscans' from the model name 'QRScan'
export default mongoose.models.QRScan || mongoose.model("QRScan", qrScanSchema);

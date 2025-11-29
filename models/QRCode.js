import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false, // No longer require a user
      ref: "User",
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add an index to the 'createdAt' field for efficient sorting.
qrCodeSchema.index({ createdAt: -1 });

// Mongoose will create a collection named 'qrcodes' from the model name 'QRCode'
export default mongoose.models.QRCode || mongoose.model("QRCode", qrCodeSchema);
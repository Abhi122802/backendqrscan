import mongoose from "mongoose";

const qrSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.models.QRCode || mongoose.model("QRCode", qrSchema);

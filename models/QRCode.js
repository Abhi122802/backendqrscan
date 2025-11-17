const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  url: { type: String, required: true },
  status: { type: String, default: "inactive" },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("QRCode", qrCodeSchema);

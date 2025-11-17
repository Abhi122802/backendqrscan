import { saveQR, updateQR, getQR } from "../controllers/qrcodeController.js";

export default async function handler(req, res) {
  if (req.method === "POST") return saveQR(req, res);
  if (req.method === "PUT") return updateQR(req, res);
  if (req.method === "GET") return getQR(req, res);

  res.status(404).json({ message: "Route not found" });
}

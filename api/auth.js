import { login, register } from "../controllers/authController.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (req.url.includes("login")) return login(req, res);
    if (req.url.includes("register")) return register(req, res);
  }

  res.status(404).json({ message: "Route not found" });
}

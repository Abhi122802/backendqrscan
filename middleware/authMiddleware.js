import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { response } from "../utils/helpers.js";

export const protect = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (select '-password' to exclude the password hash)
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      console.error("Authentication error:", error);
      return response(res, 401, "Not authorized, token failed.");
    }
  }
  return response(res, 401, "Not authorized, no token provided.");
};
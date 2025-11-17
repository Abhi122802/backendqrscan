import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { response } from "../utils/helpers.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (select '-password' to exclude the password hash)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Authentication error:", error);
      return response(res, 401, "Not authorized, token failed");
    }
  }

  if (!token) {
    return response(res, 401, "Not authorized, no token");
  }
};
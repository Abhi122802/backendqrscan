import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { response } from "../utils/helpers.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return response(res, 401, "Authorization token not found.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // The decoded token now becomes the user object, containing the id

    next();
  } catch (e) {
    return response(res, 401, "Invalid or expired token.");
  }
}

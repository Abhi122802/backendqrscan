import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { response } from "../utils/helpers.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return response(res, 400, "Please provide all required fields.");
    }

    const exists = await User.findOne({ email });
    if (exists) return response(res, 400, "User with this email already exists.");

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });

    // Do not send the full user object back, especially the password hash
    const userResponse = { _id: user._id, name: user.name, email: user.email };

    return response(res, 201, "User registered successfully!", { user: userResponse });
  } catch (e) {
    console.error("Register Error:", e);
    return response(res, 500, "Server error during registration.");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return response(res, 400, "Please provide email and password.");
    }

    const user = await User.findOne({ email });
    if (!user) return response(res, 404, "Invalid credentials."); // Use a generic message for security

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return response(res, 400, "Invalid credentials.");

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const userResponse = { _id: user._id, name: user.name, email: user.email };

    return response(res, 200, "Login successful!", { token, user: userResponse });
  } catch (e) {
    console.error("Login Error:", e);
    return response(res, 500, "Server error during login.");
  }
};

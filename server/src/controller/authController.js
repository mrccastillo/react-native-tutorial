import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
  try {
    res.status(200).json({ message: "Register endpoint hit" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

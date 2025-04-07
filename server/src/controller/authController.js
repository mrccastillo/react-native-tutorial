import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//generate token
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

// Register a new user
export const register = async (req, res) => {
  const { username, password, email, profileImage } = req.body;
  try {
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      profileImage,
    });

    await newUser.save();

    const token = generateToken(newUser);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profileImage: newUser.profileImage,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Please check your credential if it is correct" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImage: user.profileImage,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

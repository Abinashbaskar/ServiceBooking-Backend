import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// Generate JWT token
const generateToken = (userid, email) => {
  return jwt.sign({ userid, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Generate custom User ID (U001, U002, ...)
const generateUserId = async () => {
  const lastUser = await User.findOne({
    order: [["createdAt", "DESC"]],
  });

  if (!lastUser) return "U001";

  const lastId = lastUser.userid; // e.g., "U005"
  const numericPart = parseInt(lastId.slice(1)); // remove 'U'
  const newNumeric = (numericPart + 1).toString().padStart(3, "0");

  return `U${newNumeric}`;
};

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userid = await generateUserId();

    const newUser = await User.create({
      userid,
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      userid: newUser.userid,
      token: generateToken(newUser.userid, newUser.email),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        userid: user.userid,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.userid, user.email),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Protected Route Example
export const getProfile = async (req, res) => {
  try {
    res.json({ message: "Profile data", user: req.user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

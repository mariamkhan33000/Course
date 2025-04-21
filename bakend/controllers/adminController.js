import adminGenToken from "../config/adminGenToken.js";
import Admin from "../models/adminModels.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Check if all fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const adminSchema = z.object({
      firstName: z
        .string()
        .min(3, { message: "First name is must be at least 3 characters" }),
      lastName: z
        .string()
        .min(3, { message: "Last name is must be at least 3 characters" }),
      email: z.string().email(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    });
    // Validate the input data using Zod
    const validation = adminSchema.safeParse(req.body);
    if (!validation.success) {
      return res
        .status(400)
        .json({ errors: validation.error.issues.map((err) => err.message) });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new user
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    return res.status(201).json({
      message: "User created successfully",
      admin: {
        id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    return res.status(500).json({
      error: error.message,
      message: "Sign up error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Find the user by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token
    const token = adminGenToken(admin._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send the token in the response
    res.status(200).json({
      message: "Login successful",
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: error.message,
      message: "Login error",
    });
  }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
        error: error.message,
        message: "Logout error",
        });
    }
}
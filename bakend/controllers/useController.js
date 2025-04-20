import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import  { z } from "zod";
import jwt from "jsonwebtoken";
import generateToken from "../config/genrateToken.js";
import Purchase from "../models/purchaseModels.js";
import Course from "../models/courseModel.js";

export const signUp = async (req, res) => {
    const { firstName, lastName,  email, password } = req.body;
    try {
        
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        // Validation using Zod
        const userSchema = z.object({
            firstName: z.string().min(3,{ message :"First name is must be at least 3 characters"}),
            lastName: z.string().min(3,{ message :"Last name is must be at least 3 characters"}),
            email: z.string().email(),
            password: z.string().min(6, { message: "Password must be at least 6 characters" })
        });

        const Validation = userSchema.safeParse(req.body);
        if (!Validation.success) {
            return res.status(400).json({ errors: Validation.error.issues.map(err => err.message) });
        }
        // Check if user already exists 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt  = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await user.save();

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message, message: "Sign up error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        await generateToken(res, user._id);
        res.status(200).json({ message: "Login successful", user,token});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Login error" });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Logout error" });
    }
}

export const purchases = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        let purchased = await Purchase.find({ userId })

        let purchasedCourseId = [];

        for (let i = 0; i < purchased.length; i++) {
            purchasedCourseId.push(purchased[i].courseId);

            const courseData = await Course.findById({
                _id: {$in: purchasedCourseId
                }
            })
        }
        res.status(200).json({ message: "Purchased courses fetched successfully", purchasedCourseId, courseData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: "Fetch error" });
    }
}
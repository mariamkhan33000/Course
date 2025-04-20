import e from "express";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.LOCAL_URL)
        console.log(`MongoDB Database connected at ${mongoose.connection.host} successfully. . . . . . `)
    } catch (error) {
        console.log(`MongoDB Database connection failed. . . . . . `, error.message)
    }
}

export default connectDB;

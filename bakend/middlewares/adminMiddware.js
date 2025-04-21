import jwt from "jsonwebtoken";


export const adminMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.ADMIN_PASSWORD);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req.adminId = decoded.id;
        next();

    } catch (error) {
        console.error("Middleware error:", error);
        return res.status(500).json({
            error: error.message,
            message: "Middleware error",
        });
    }
}
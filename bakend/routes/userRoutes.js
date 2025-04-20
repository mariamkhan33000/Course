import express from "express";
import { login, logout, purchases, signUp } from "../controllers/useController.js";
import { authMiddleware } from "../middlewares/userMiddleware.js";


const router = express.Router()

router.post('/register', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.get('/purchases', authMiddleware, purchases)


export default router;

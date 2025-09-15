import express from "express";
import { registerUser, loginUser, getProfile } from "../Controllers/AuthController.js";
import { protect } from "../MiddleWares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route
router.get("/profile", protect, getProfile);

export default router;

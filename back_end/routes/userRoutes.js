import express, { Router } from "express";
import {
  loginUser,
  registerUser,
  updateHabits,
  userAddHabits,
  userLogout,
} from "../controllers/habitController.js";
import { authMiddleware } from "../midleware/Middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, userAddHabits);
router.post("/logout", userLogout);
router.post("/update-habits", authMiddleware, updateHabits);

export default router
import express from "express";
import {
  registerUser,
  loginUser,
  verifiedToken,
} from "../controllers/users.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/verify", verifiedToken);

export default router;

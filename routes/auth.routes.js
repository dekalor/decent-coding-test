import express from "express";
import { generateToken } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/auth/token", generateToken);

export default router;
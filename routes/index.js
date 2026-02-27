import express from "express";
import bookRoutes from "./book.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

// Health Check
router.get("/ping", (req, res) => {
  res.status(200).json({ success: true });
});

// Echo
router.post("/echo", (req, res) => {
  res.json({ you_sent: req.body });
});

router.use(bookRoutes);
router.use(authRoutes);

export default router;
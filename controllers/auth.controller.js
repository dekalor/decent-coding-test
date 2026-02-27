import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/jwt.js";

export function generateToken(req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Username is required"
    });
  }

  const payload = {
    username
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  res.json({
    success: true,
    token,
    expiresIn: JWT_EXPIRES_IN
  });
}
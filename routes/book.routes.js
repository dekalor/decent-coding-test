import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/books", createBook);
router.get("/books", getBooks); //authMiddleware
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

export default router;
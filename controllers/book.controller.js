import { v4 as uuidv4 } from "uuid";
import { books } from "../data/stores.js";

/* CREATE */
export function createBook(req, res) {
  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Title and author are required"
    });
  }

  const newBook = {
    id: uuidv4(),
    title,
    author,
    year: year || null,
    createdAt: new Date()
  };

  books.push(newBook);

  res.status(201).json(newBook);
}

/* READ ALL (Protected + Search + Pagination) */
export function getBooks(req, res) {
  let result = [...books];

  const { author, page = 1, limit = 10 } = req.query;

  if (author) {
    result = result.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  const paginated = result.slice(startIndex, endIndex);
  // total: result.length,
  //   page: pageNumber,
  //   limit: limitNumber,

  res.json(paginated);
}

/* READ ONE */
export function getBookById(req, res) {
  const id = req.params.id;
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  res.json(book);
}

/* UPDATE */
export function updateBook(req, res) {
  console.log("BODY:", req.body);
  console.log("PARAM:", req.params.id);
  console.log("BOOKS:", books);
  const id = req.params.id;

  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found"
    });
  }

  const { title, author, year } = req.body || {};

  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (year !== undefined) book.year = year;

  return res.status(200).json(book);
}

/* DELETE */
export function deleteBook(req, res) {
  const id = req.params.id;
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(204).send();
  }

  books.splice(index, 1);

  return res.status(204).send();
}
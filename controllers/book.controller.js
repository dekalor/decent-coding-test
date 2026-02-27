import { books, getNextId } from "../data/store.js";

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
    id: getNextId().toString(),
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
  const book = books.find(b => b.id === req.params.id);

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
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  const { title, author, year } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Title and author are required"
    });
  }

  books[index] = {
    ...books[index],
    title,
    author,
    year: year || null,
    updatedAt: new Date()
  };

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: books[index]
  });
}

/* DELETE */
export function deleteBook(req, res) {
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Book not found"
    });
  }

  const deleted = books[index];
  books.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: deleted
  });
}
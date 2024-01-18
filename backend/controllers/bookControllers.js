const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const { restart } = require("nodemon");

const getBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({ id: req.id });
    res.status(200).json(books);
  } catch (error) {
    console.log("Error getting the data", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const createBook = asyncHandler(async (req, res) => {
  console.log("The request body is", req.body);
  try {
    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "All fields are mandatory: title, author, publishYear",
      });
    }

    const book = await Book.create({
      title,
      author,
      publishYear,
    });
    res.status(201).json(book);
  } catch (error) {
    console.log("Error while posting data", error.message);
    res.status(500).send({ message: error.message });
  }
});

const getBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ error: "Book not Found!" });
      throw new Error("Book not Found!");
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("Error getting the book with particular ID", error);
  }
});

const updateBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404);
      throw new Error("Book not Found");
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log("Error updating Book", error);
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404);
      throw new Error("Book not Found");
    }

    const deletedBook = await Book.findOneAndDelete(book);
    if (!deleteBook) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res
      .status(200)
      .json({ message: "Book deleted Successfully", deletedBook });
  } catch (error) {
    console.log("Error while Deleting the Book", error);
  }
});

module.exports = { getBooks, createBook, getBook, updateBook, deleteBook };

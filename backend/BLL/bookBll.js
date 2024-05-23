import Book from "../models/bookModel.js";

// 1) Get all books
const getAllBooks = async (req, res) => {
  const allBooks = await Book.find({});
  if (!allBooks) res.status(400).send("There is an error!");
  res.status(200).json(allBooks);
};
const getBookById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).send({ message: "wrong book ID!" });
  }
  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(err);
    res.status(404).send("wrong request!");
  }
};

// 3) Create new book
const createBook = async (req, res) => {
  const { title, author, publishYear, genre } = req.body;

  try {
    if (!title || !author || !publishYear) {
      return res.status(400).send({ message: "please enter All fields" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }

  // Check if book exist in DB
  const bookExist = await Book.findOne({ title });

  if (bookExist) {
    return res.status(400).send("Book already existing!");
  }
  const newGenre = genre || "Unknown";
  const newBook = await Book.create({
    title,
    author,
    publishYear,
    genre: newGenre,
  });
  if (newBook) {
    res.status(201).send(newBook);
  } else {
    res.status(500).send("Failed to create book");
  }
};

// 3) Delete book from DB
const removeBook = async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await Book.findByIdAndDelete(id);
    if (!removed) res.status(404).json({ message: "Book not found!" });
    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};
// To get authors
const getAllAuthors = async (req, res) => {
  const authors = await Book.distinct("author");
  if (!authors) res.status(400).send("there is no authors");
  res.status(200).json(authors);
};

// Get All Genres
const getAllGenres = async (req, res) => {
  // find all the unique values for a specified field
  const genres = await Book.distinct("genre");
  if (!genres) res.status(400).send("there is no genres");
  res.status(200).json(genres);
};
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publishYear, genre } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        publishYear,
        genre,
      },
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(400).send({ message: "Unable to update book", error });
  }
};

export {
  getAllBooks,
  createBook,
  removeBook,
  getAllAuthors,
  getAllGenres,
  getBookById,
  updateBook,
};

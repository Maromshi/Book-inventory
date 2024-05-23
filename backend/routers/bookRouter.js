import express from "express";
import {
  getAllBooks,
  createBook,
  getBookById,
  removeBook,
  updateBook,
} from "../BLL/bookBll.js";

const router = express.Router();

// Handle CRUD operations
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.route("/newBook").post(createBook);
router.route("/update/:id").put(updateBook);
router.route("/:id").delete(removeBook);
// router.get("/authors", bookBll.getAllAuthors);
// router.get("/genres", bookBll.getAllGenres);

export default router;

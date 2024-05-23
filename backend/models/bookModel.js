import mongoose from "mongoose";

// Book Scheme
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: {
      type: Number,
      required: true,
    },
    genre: { type: String, default: "Unknown" },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;

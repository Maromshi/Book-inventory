import { Box, Button, TextField, Snackbar } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const NewBookComponent = ({ books, setBooks }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [genre, setGenre] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const newBook = { title, author, publishYear, genre };
      // Server return the new book as response
      const resp = await axios.post(
        "http://localhost:5555/books/newBook",
        newBook
      );
      setBooks((prevBooks) => [...prevBooks, resp.data]); // update list with New book
    } catch (error) {
      console.log(error.response.data);
      setErrorMessage(error.response.data);
      setOpen(true); // Show the Snackbar with the error message
    }
  };
  const handleClose = () => {
    setOpen(false); // Close the Snackbar
  };
  return (
    <Box
      component="form"
      onSubmit={submitForm}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <TextField
        id="titleInput"
        required
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ flex: "1 1 calc(25% - 16px)" }}
      />
      <TextField
        id="authorInput"
        required
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        sx={{ flex: "1 1 calc(25% - 16px)" }}
      />
      <TextField
        id="yearInput"
        label="Publish Year"
        required
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
        sx={{ flex: "1 1 calc(25% - 16px)" }}
      />
      <TextField
        id="genreInput"
        label="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        sx={{ flex: "1 1 calc(25% - 16px)" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ background: "#72C2EA", color: "black", fontWeight: "bold" }}
      >
        Add New Book
      </Button>
      <Snackbar
        // anchorOrigin="top"
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={errorMessage}
      />
    </Box>
  );
};

export default NewBookComponent;

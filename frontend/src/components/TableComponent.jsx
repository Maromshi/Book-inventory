// import React from "react";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Button,
//   Box,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";

// const TableComponent = ({ books, setBooks }) => {
//   const removeHandler = async (id) => {
//     try {
//       const resp = await axios.delete(`http://localhost:5555/books/${id}`);
//       setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));

//       console.log(resp.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#72C2EA" }}>
//             <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>{" "}
//             {/* Make text bold */}
//             <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Publish Year</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Genre</TableCell>
//             <TableCell sx={{ fontWeight: "bold" }}>Operations</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {books.map((book) => (
//             <TableRow key={book._id}>
//               <TableCell>{book.title}</TableCell>
//               <TableCell>{book.author}</TableCell>
//               <TableCell>{book.publishYear}</TableCell>
//               <TableCell>{book.genre}</TableCell>
//               <TableCell>
//                 <Box>
//                   <Button
//                     variant="outlined"
//                     startIcon={<DeleteIcon />}
//                     color="error"
//                     size="small"
//                     onClick={() => {
//                       removeHandler(book._id);
//                     }}
//                   >
//                     Delete
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     sx={{ margin: 1 }}
//                     onClick={() => {
//                       removeHandler(book._id);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                 </Box>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="10vh"
//       ></Box>
//     </>
//   );
// };

// export default TableComponent;

import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const TableComponent = ({ books, setBooks }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editedBook, setEditedBook] = useState({}); // Stores the data of the book being edited.

  const editHandler = (book) => {
    // console.log(book);
    setEditRowId(book._id);
    setEditedBook(book);
  };

  const saveHandler = async (id) => {
    console.log(id);
    try {
      const resp = await axios.put(
        `http://localhost:5555/books/update/${id}`,
        editedBook
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book._id === id ? editedBook : book))
      );
      setEditRowId(null);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeHandler = async (id) => {
    try {
      const resp = await axios.delete(`http://localhost:5555/books/${id}`);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#72C2EA" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Publish Year</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Genre</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Operations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              {editRowId === book._id ? (
                <>
                  <TableCell>
                    <TextField
                      name="title"
                      value={editedBook.title}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="author"
                      value={editedBook.author}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="publishYear"
                      value={editedBook.publishYear}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="genre"
                      value={editedBook.genre}
                      onChange={handleChange}
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ margin: 1 }}
                        onClick={() => saveHandler(book._id)}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ margin: 1 }}
                        onClick={() => setEditRowId(null)}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.publishYear}</TableCell>
                  <TableCell>{book.genre}</TableCell>
                  <TableCell>
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="error"
                        size="small"
                        onClick={() => removeHandler(book._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ margin: 1 }}
                        onClick={() => editHandler(book)}
                      >
                        Edit
                      </Button>
                    </Box>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="10vh"
      ></Box>
    </>
  );
};

export default TableComponent;

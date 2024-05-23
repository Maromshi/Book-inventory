import React, { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "../components/TableComponent";
import NewBookComponent from "../components/NewBookComponent";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const resp = await axios.get("http://localhost:5555/books"); // Ensure the correct URL
        setBooks(resp.data);
        console.log(resp.data); // Log the response data directly
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false); // Always set loading to false after fetch
      }
    };
    fetchBooks();
  }, []);
  return (
    <>
      {<TableComponent books={books} setBooks={setBooks} />}
      {<NewBookComponent books={books} setBooks={setBooks} />}
    </>
  );
};

export default Home;

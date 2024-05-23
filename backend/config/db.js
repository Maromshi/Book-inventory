import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Book_directory")
    .then(() => console.log("Connected to Booking Directory!"))
    .catch((error) => console.log(error));
};

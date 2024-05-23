import express from "express";
import { PORT } from "./config/config.js";
import { connectDB } from "./config/db.js";
import bookRouter from "../backend/routers/bookRouter.js";
import cors from "cors";

connectDB();
const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use("/books", bookRouter);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT} ...`);
});

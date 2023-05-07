import express from "express";
import { connectToDatabase } from "./configs/db.config";
import { booksRouter } from "./routes/ books.route";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

connectToDatabase()
    .then(() => {
        app.use("/books", booksRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });
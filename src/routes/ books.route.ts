// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../configs/db.config";
import Book from "../models/book";

// Global Config
export const booksRouter = express.Router();
booksRouter.use(express.json());

// GET
booksRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const books = (await collections.books?.find().toArray()) as unknown as Book[];

        res.status(200).send(books);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        }
    }
});

// POST
booksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newBook = req.body as Book;
        const result = await collections.books?.insertOne(newBook);

        result
            ? res.status(201).send(`Successfully created a new book with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new book.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error);
            res.status(400).send(error.message);
        }
    }
});

// PUT
booksRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedBook: Book = req.body as Book;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.books?.updateOne(query, { $set: updatedBook});

        result
            ? res.status(200).send(`Successfully updated book with id ${id}`)
            : res.status(304).send(`Book with id: ${id} not updated`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(400).send(error.message);
        }
    }
});

// DELETE
booksRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.books?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed book with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove book with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Book with id ${id} does not exist`);
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(error.message);
        res.status(400).send(error.message);
        }
    }
});
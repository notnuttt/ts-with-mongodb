// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/db-service";
import Book from "../models/book";

// Global Config
export const booksRouter = express.Router();
booksRouter.use(express.json());

// GET
booksRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const books = (await collections.books?.find().toArray()) as Book[];

        res.status(200).send(books);
    } catch {
        res.status(500).send("Cannot fetch the books.");
    }
});

// POST
booksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newGame = req.body as Book;
        const result = await collections.books?.insertOne(newGame);

        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    } catch {
        // console.error(error);
        res.status(400).send('Error');
    }
});

// PUT
booksRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedGame: Book = req.body as Book;
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.books?.updateOne(query, { $set: updatedGame });

        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    } catch (error) {
        // console.error(error.message);
        res.status(400).send('Error');
    }
});

// DELETE
booksRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.books?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    } catch (error) {
        // console.error(error.message);
        res.status(400).send('Error');
    }
});
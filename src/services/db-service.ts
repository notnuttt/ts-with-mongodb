// External Dependencies
import { MongoClient, Collection, Db }from "mongodb";
import dotenv from "dotenv";


// Global Variables
export const collections: { books?: Collection } = {}


// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: MongoClient = new MongoClient(process.env.DB_URL!);
            
    await client.connect();
        
    const db: Db = client.db(process.env.DB_NAME);
   
    const bookCollection: Collection = db.collection(process.env.BOOKS_COLLECTION_NAME!);
 
    collections.books = bookCollection;
       
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${bookCollection.collectionName}`);
 }
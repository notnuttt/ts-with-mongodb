// External dependencies
import { ObjectId } from "mongodb";


// Class Implementation
export default class Book {
    constructor(
        title: string, 
        pages: number, 
        categories: string[], 
        id?: ObjectId
    ) {}

}
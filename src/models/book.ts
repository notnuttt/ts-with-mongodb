// External dependencies
import { ObjectId } from "mongodb";


// Class Implementation
export default class Book {
    constructor(
        public title: string, 
        public pages: number, 
        public categories: string[], 
        public id?: ObjectId
    ) {}
}
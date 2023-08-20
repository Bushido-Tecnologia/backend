import { ObjectId } from "mongoose";

export interface User {
    email: string;
    name: string;
    password: string
    createdAt?: Date
    updatedAt?: Date
    _id?: ObjectId
}
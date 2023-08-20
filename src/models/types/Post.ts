import { ObjectId } from "mongoose";

export interface Post {
    title: string;
    body: string;
    base64: string;
    createdBy: string;
    createdAt: Date;
    updatedAt?: Date
    _id?: ObjectId
}
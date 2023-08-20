import { ObjectId } from "mongoose";

export interface Enrollment {
    email: string; 
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    _id?: ObjectId;
}
import { ObjectId } from "mongoose";

export interface Voluntary {
    firstName: string;
    lastName: string
    email: string;
    phoneNumber: number
    createdAt?: Date
    updatedAt?: Date
    _id?: ObjectId
}

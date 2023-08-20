import { Schema, model } from 'mongoose';

const voluntarySchema = {
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    phoneNumber: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
}

export const VoluntarySchema = new Schema()

export const voluntaryModel = model('voluntary', VoluntarySchema);

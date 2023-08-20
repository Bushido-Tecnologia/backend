import { Schema, model } from 'mongoose';

const userSchema = {
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
}

export const UserSchema = new Schema(userSchema);

export const userModel = model('user', UserSchema);

import { Schema, model } from 'mongoose';

const postSchema = {
    title: { type: String, required: true, unique: true},
    body: { type: String, required: true},
    base64: { type: String, required: true},
    createdBy: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
}

export const PostSchema = new Schema(postSchema);

export const postModel = model('post', PostSchema);

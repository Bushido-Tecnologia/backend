import { Schema, model } from 'mongoose';

const enrollmentSchema = {
    email: { type: String, required: true},
    name: { type: String, required: true},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
}

export const EnrollmentSchema = new Schema(enrollmentSchema);

export const enrollmentModel = model('enrollment', EnrollmentSchema);

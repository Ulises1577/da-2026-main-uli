import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const appointmentSchema = new Schema({
    clientName: { type: String, required: true },
    clientEmail: {type: String, required: true },
    date: { type: Date, required: true },
    service: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

export const AppointmentModel = model('Appointment', appointmentSchema,);

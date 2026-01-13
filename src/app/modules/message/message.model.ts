import { Schema, model } from "mongoose";
import { IMessageForm } from "./message.interface";

const MessageFormSchema = new Schema<IMessageForm>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        isHuman: {
            type: Boolean,
        },
    },
    {
        timestamps: true, // adds createdAt & updatedAt
    }
);

export const MessageForm = model<IMessageForm>(
    "MessageForm",
    MessageFormSchema
);

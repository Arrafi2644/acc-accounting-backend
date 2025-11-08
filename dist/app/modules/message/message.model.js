"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageForm = void 0;
const mongoose_1 = require("mongoose");
const MessageFormSchema = new mongoose_1.Schema({
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
        required: true,
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
        required: true,
    },
}, {
    timestamps: true, // adds createdAt & updatedAt
});
exports.MessageForm = (0, mongoose_1.model)("MessageForm", MessageFormSchema);

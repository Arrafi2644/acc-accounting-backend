"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = void 0;
const mongoose_1 = require("mongoose");
const TestimonialSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
    },
    companyName: {
        type: String,
        default: null,
    },
    designation: {
        type: String,
        default: null,
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Minimum rating is 1"],
        max: [5, "Maximum rating is 5"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
    },
    photoUrl: {
        type: String,
        default: null,
    },
    date: {
        type: String,
        default: () => new Date().toISOString(),
    },
    isApproved: {
        type: Boolean,
        default: false, // initially not approved
    },
}, {
    timestamps: true, // adds createdAt and updatedAt automatically
});
exports.Testimonial = (0, mongoose_1.model)("Testimonial", TestimonialSchema);

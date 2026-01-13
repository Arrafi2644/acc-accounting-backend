"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = void 0;
const mongoose_1 = require("mongoose");
const TestimonialSchema = new mongoose_1.Schema({
    partnershipLabel: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    designation: {
        type: String,
        default: null,
    },
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    industry: {
        type: String,
        required: true,
        trim: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});
exports.Testimonial = (0, mongoose_1.model)("Testimonial", TestimonialSchema);

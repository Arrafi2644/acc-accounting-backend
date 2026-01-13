"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinUsForm = void 0;
const mongoose_1 = require("mongoose");
const joinUsFormSchema = new mongoose_1.Schema({
    businessName: { type: String, required: true },
    directorsAndShareholders: { type: String, required: true },
    irdNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    authorityConsent: { type: Boolean, required: true },
    documents: { type: [String], default: [] },
}, {
    timestamps: true,
});
exports.JoinUsForm = (0, mongoose_1.model)("JoinUsForm", joinUsFormSchema);

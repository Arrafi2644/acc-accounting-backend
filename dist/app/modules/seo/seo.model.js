"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SEO = void 0;
const mongoose_1 = require("mongoose");
const SEOSchema = new mongoose_1.Schema({
    pagePath: { type: String, required: true, unique: true },
    pageTitle: { type: String, required: true },
    pageDescription: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeywords: { type: String },
    canonicalURL: { type: String, required: true },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
}, { timestamps: true });
exports.SEO = (0, mongoose_1.model)("SEO", SEOSchema);

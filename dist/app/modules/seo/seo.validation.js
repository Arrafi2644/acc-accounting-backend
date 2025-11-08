"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSEOZodSchema = exports.createSEOZodSchema = void 0;
const zod_1 = require("zod");
exports.createSEOZodSchema = zod_1.z.object({
    pagePath: zod_1.z.string({
        required_error: "Page Path is required",
    }).min(1, "Page Path cannot be empty"),
    pageTitle: zod_1.z.string({
        required_error: "Page Title is required",
    }).max(100, "Page Title should be max 100 characters"),
    pageDescription: zod_1.z.string({
        required_error: "Page Description is required",
    }).max(500, "Page Description should be max 500 characters"),
    metaTitle: zod_1.z.string({
        required_error: "Meta Title is required",
    }).max(60, "Meta Title should be max 60 characters"),
    metaDescription: zod_1.z.string({
        required_error: "Meta Description is required",
    }).max(160, "Meta Description should be max 160 characters"),
    metaKeywords: zod_1.z.string().optional(),
    canonicalURL: zod_1.z.string({
        required_error: "Canonical URL is required",
    }).url("Canonical URL must be a valid URL"),
    ogTitle: zod_1.z.string().optional(),
    ogDescription: zod_1.z.string().optional(),
    ogImage: zod_1.z.string().url("OG Image must be a valid URL").optional(),
});
exports.updateSEOZodSchema = zod_1.z.object({
    pageTitle: zod_1.z.string()
        .max(100, "Page Title should be max 100 characters")
        .optional(),
    pageDescription: zod_1.z.string()
        .max(500, "Page Description should be max 500 characters")
        .optional(),
    metaTitle: zod_1.z.string()
        .max(60, "Meta Title should be max 60 characters")
        .optional(),
    metaDescription: zod_1.z.string()
        .max(160, "Meta Description should be max 160 characters")
        .optional(),
    metaKeywords: zod_1.z.string().optional(),
    canonicalURL: zod_1.z.string()
        .url("Canonical URL must be a valid URL")
        .optional(),
    ogTitle: zod_1.z.string().optional(),
    ogDescription: zod_1.z.string().optional(),
    ogImage: zod_1.z.string()
        .url("OG Image must be a valid URL")
        .optional(),
});

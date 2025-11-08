"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteInfoZodSchema = void 0;
const zod_1 = require("zod");
exports.siteInfoZodSchema = zod_1.z.object({
    // Site & Branding
    siteTitle: zod_1.z.string().optional(),
    siteTagline: zod_1.z.string().optional(),
    logoUrl: zod_1.z.string().url().optional(),
    faviconUrl: zod_1.z.string().url().optional(),
    // Contact Details
    adminEmail: zod_1.z.string().email().optional(),
    supportEmail: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    supportPhone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    businessHours: zod_1.z
        .object({
        days: zod_1.z.array(zod_1.z.string()).optional(),
        start: zod_1.z.string().optional(),
        end: zod_1.z.string().optional(),
    })
        .optional(),
    mapEmbedUrl: zod_1.z.string().url().optional(),
    // Social Media
    social: zod_1.z
        .object({
        facebook: zod_1.z.string().url().optional(),
        linkedin: zod_1.z.string().url().optional(),
        youtube: zod_1.z.string().url().optional(),
        twitter: zod_1.z.string().url().optional(),
        instagram: zod_1.z.string().url().optional(),
        tiktok: zod_1.z.string().url().optional(),
        pinterest: zod_1.z.string().url().optional(),
        whatsapp: zod_1.z.string().url().optional(),
    })
        .optional(),
});

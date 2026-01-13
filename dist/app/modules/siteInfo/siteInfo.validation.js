"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSiteInfoSchema = exports.createSiteInfoSchema = void 0;
const zod_1 = require("zod");
// Create Schema - required fields must be present
exports.createSiteInfoSchema = zod_1.z.object({
    siteTitle: zod_1.z.string().optional(),
    siteTagline: zod_1.z.string().optional(),
    mainLogo: zod_1.z.string(), // required
    faviconLogo: zod_1.z.string().optional(),
    footerLogo: zod_1.z.string(), // required
    supportEmail: zod_1.z.string().email().optional(),
    mainEmail: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().optional(),
    supportPhone: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    mapEmbedUrl: zod_1.z.string().optional(),
    facebook: zod_1.z.string().url().optional(),
    linkedin: zod_1.z.string().url().optional(),
    youtube: zod_1.z.string().url().optional(),
    twitter: zod_1.z.string().url().optional(),
    instagram: zod_1.z.string().url().optional(),
    tiktok: zod_1.z.string().url().optional(),
    pinterest: zod_1.z.string().url().optional(),
    whatsapp: zod_1.z.string().url().optional(),
});
// Update Schema - all fields optional
exports.updateSiteInfoSchema = exports.createSiteInfoSchema.partial();

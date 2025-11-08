"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteInfo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const SiteInfoSchema = new mongoose_1.default.Schema({
    siteTitle: { type: String },
    siteTagline: { type: String },
    logoUrl: { type: String },
    faviconUrl: { type: String },
    adminEmail: { type: String },
    supportEmail: { type: String },
    phone: { type: String },
    supportPhone: { type: String },
    address: { type: String },
    businessHours: {
        days: [{ type: String }],
        start: { type: String },
        end: { type: String },
    },
    mapEmbedUrl: { type: String },
    social: {
        facebook: { type: String },
        linkedin: { type: String },
        youtube: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        tiktok: { type: String },
        pinterest: { type: String },
        whatsapp: { type: String },
    },
}, { timestamps: true });
exports.SiteInfo = mongoose_1.default.model("SiteInfo", SiteInfoSchema);

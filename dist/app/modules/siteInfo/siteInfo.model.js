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
    mainLogo: { type: String, required: true },
    faviconLogo: { type: String },
    footerLogo: { type: String, required: true },
    mainEmail: { type: String },
    supportEmail: { type: String },
    phone: { type: String },
    supportPhone: { type: String },
    address: { type: String },
    mapEmbedUrl: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    pinterest: { type: String },
    whatsapp: { type: String },
}, { timestamps: true });
exports.SiteInfo = mongoose_1.default.model("SiteInfo", SiteInfoSchema);

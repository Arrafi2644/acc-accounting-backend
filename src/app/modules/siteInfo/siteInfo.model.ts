import mongoose from "mongoose";
import { ISiteInfo } from "./siteInfo.interface";

const SiteInfoSchema  = new mongoose.Schema<ISiteInfo>({
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
  },
  { timestamps: true }
);

export const SiteInfo = mongoose.model<ISiteInfo>("SiteInfo", SiteInfoSchema);
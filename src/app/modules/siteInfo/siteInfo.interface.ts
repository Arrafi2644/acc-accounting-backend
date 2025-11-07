export interface ISiteInfo {
  // Site & Branding
  siteTitle?: string;
  siteTagline?: string;
  logoUrl?: string;
  faviconUrl?: string;

  // Contact Details
  adminEmail?: string;
  supportEmail?: string;
  phone?: string;
  supportPhone?: string;
  address?: string;
  businessHours?: {
    days?: string[]; // e.g., ["Mon", "Tue"]
    start?: string;  // "09:00"
    end?: string;    // "17:00"
  };
  mapEmbedUrl?: string;

  // Social Media
  social?: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    pinterest?: string;
    whatsapp?: string;
  };
}

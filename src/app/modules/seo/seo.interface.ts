export interface ISEO {
  pagePath: string;
  pageTitle: string;     
  pageDescription: string;  
  metaTitle: string;
  metaDescription: string;
  metaKeywords?: string;
  canonicalURL: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;

  createdAt?: Date;
  updatedAt?: Date;
}

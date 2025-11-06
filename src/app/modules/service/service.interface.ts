
// Service Type Schema 

import { Types } from "mongoose";

export interface IServiceType {
    name: string
}

export interface IService {
    title: string;
    slug: string;
    description?: string;
    images?: string[];
    included?: string[];
    excluded?: string[];
    amenities?: string[];
    servicePlan?: string[];
    subServices?: {
        title: string;
        description: string;
        image: string[];
    }[];
    serviceType: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    deleteImages: string[];
}
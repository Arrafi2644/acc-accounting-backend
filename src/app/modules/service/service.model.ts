import { model, Schema } from "mongoose";
import { IServiceType } from "./service.interface";

const serviceTypeSchema = new Schema<IServiceType>({
    name: { type: String, required: true, unique: true }
}, {
    timestamps: true
})

export const ServiceType = model<IServiceType>("TourType", serviceTypeSchema)
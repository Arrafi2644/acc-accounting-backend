import mongoose, { model } from "mongoose";
import { IReferralForm } from "./referralForm.interface";

// Schema
const ReferralFormSchema = new mongoose.Schema<IReferralForm>(
    {
        referralName: { type: String, required: true },
        yourName: { type: String, required: true },
        referralEmail: { type: String, required: true },
        yourEmail: { type: String, required: true },
        referralPhone: { type: String, required: true },
        helpDescription: { type: String, required: true },
        referralAddress: { type: String, required: true },
        referralSuburb: { type: String },
        isHuman: { type: Boolean, required: true }
    },
    {
        timestamps: true
    }
);

// Model
export const ReferralForm = model<IReferralForm>("ReferralForm", ReferralFormSchema);
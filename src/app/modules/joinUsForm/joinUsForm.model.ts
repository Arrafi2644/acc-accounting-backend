import { Schema, model } from "mongoose";
import { IJoinUsForm } from "./joinUsForm.interface";

const joinUsFormSchema = new Schema<IJoinUsForm>(
  {
    businessName: { type: String, required: true },
    directorsAndShareholders: { type: String, required: true },
    irdNumber: { type: String, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    authorityConsent: { type: Boolean, required: true },
    documents: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export const JoinUsForm = model<IJoinUsForm>("JoinUsForm", joinUsFormSchema);

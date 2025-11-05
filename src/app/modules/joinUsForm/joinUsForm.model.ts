import { Schema, model } from "mongoose";
import { IJoinUsForm } from "./joinUsForm.interface";

const directorSchema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    date: { type: String, required: true },
    ird: { type: Number, required: true },
  },
  { _id: false } // prevents extra _id for subdocuments
);

const joinUsFormSchema = new Schema<IJoinUsForm>(
  {
    companyName: { type: String, required: true },
    companyDate: { type: String, required: true },
    companyIRD: { type: Number, required: true },

    director1: { type: directorSchema, required: true },
    director2: { type: directorSchema, required: true },

    address: { type: String, required: true },
    phoneBusiness: { type: String, required: true },
    phoneHome: { type: String, required: true },
    phoneMobile: { type: String, required: true },
    email: { type: String, required: true },

    isHuman: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export const JoinUsForm = model<IJoinUsForm>("JoinUsForm", joinUsFormSchema);

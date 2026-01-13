import { Schema, model } from "mongoose";
import { ITestimonialForm } from "./testimonial.interface";

const TestimonialSchema = new Schema<ITestimonialForm>(
  {
    partnershipLabel: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      default: null,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, 
  }
);

export const Testimonial = model<ITestimonialForm>("Testimonial", TestimonialSchema);

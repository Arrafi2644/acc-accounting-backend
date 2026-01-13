import { Schema, model } from "mongoose";
import { IGuideArticle, ITool } from "./resources.interface";

const guideArticleSchema = new Schema<IGuideArticle>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    readTime: {
      type: Number,
      required: true,
      min: 1,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

export const GuideArticle = model("GuideArticle", guideArticleSchema);


const ToolSchema = new Schema<ITool>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    status: { type: String, required: true, enum: ["active", "inactive"] },
  },
  { timestamps: true }
);
 

export const ToolModel = model<ITool>("Tool", ToolSchema);

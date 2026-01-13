import httpStatus from "http-status-codes";

import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { GuideArticle, ToolModel } from "./resources.model";
import { IGuideArticle, ITool } from "./resources.interface";
import { GuideArticleSearchableFields, ToolSearchableFields } from "./resources.constants";

/**
 * CREATE GUIDE ARTICLE
 */
const createGuideArticle = async (payload: IGuideArticle) => {
  const existingArticle = await GuideArticle.findOne({
    title: payload.title,
    category: payload.category,
  });

  if (existingArticle) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A similar guide article already exists."
    );
  }

  const article = await GuideArticle.create(payload);
  return article;
};

/**
 * UPDATE GUIDE ARTICLE
 */
const updateGuideArticle = async (
  id: string,
  payload: Partial<IGuideArticle>
) => {
  const existingArticle = await GuideArticle.findById(id);

  if (!existingArticle) {
    throw new AppError(httpStatus.NOT_FOUND, "Guide article not found");
  }

  const updatedArticle = await GuideArticle.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedArticle) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to update guide article"
    );
  }

  return updatedArticle;
};

/**
 * GET ALL GUIDE ARTICLES
 */
const getAllGuideArticles = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(GuideArticle.find(), query);

  const articles = await queryBuilder
    .search(GuideArticleSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    articles.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

/**
 * DELETE GUIDE ARTICLE
 */
const deleteGuideArticle = async (id: string) => {
  const article = await GuideArticle.findById(id);

  if (!article) {
    throw new AppError(httpStatus.NOT_FOUND, "Guide article not found");
  }

  const deleted = await GuideArticle.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to delete guide article"
    );
  }

  return deleted;
};



/**
 * CREATE TOOL
 */
export const createTool = async (payload: ITool) => {
  // Prevent duplicate tool with same title
  const existingTool = await ToolModel.findOne({ title: payload.title });
  if (existingTool) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "A tool with this title already exists."
    );
  }

  const tool = await ToolModel.create(payload);
  return tool;
};

/**
 * UPDATE TOOL
 */
export const updateTool = async (id: string, payload: Partial<ITool>) => {
  const existingTool = await ToolModel.findById(id);
  if (!existingTool) {
    throw new AppError(httpStatus.NOT_FOUND, "Tool not found");
  }

  const updatedTool = await ToolModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!updatedTool) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to update tool");
  }

  return updatedTool;
};

/**
 * GET ALL TOOLS
 */
export const getAllTools = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(ToolModel.find(), query);

  const tools = await queryBuilder
    .search(ToolSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([tools.build(), queryBuilder.getMeta()]);

  return { data, meta };
};

/**
 * DELETE TOOL
 */
export const deleteTool = async (id: string) => {
  const tool = await ToolModel.findById(id);
  if (!tool) {
    throw new AppError(httpStatus.NOT_FOUND, "Tool not found");
  }

  const deleted = await ToolModel.findByIdAndDelete(id);
  if (!deleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete tool");
  }

  return deleted;
};


export const ResourceServices = {
  createGuideArticle,
  updateGuideArticle,
  getAllGuideArticles,
  deleteGuideArticle,
  createTool,
  updateTool,
  getAllTools,
  deleteTool
};

import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ResourceServices } from "./resources.service";

/**
 * GET ALL GUIDE ARTICLES
 */
const getAllGuideArticles = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;

    const result = await ResourceServices.getAllGuideArticles(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Guide articles retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

/**
 * CREATE GUIDE ARTICLE
 */
const createGuideArticle = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await ResourceServices.createGuideArticle(payload);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Guide article created successfully",
      data: result,
    });
  }
);

/**
 * UPDATE GUIDE ARTICLE
 */
const updateGuideArticle = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;

    const result = await ResourceServices.updateGuideArticle(id, payload);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Guide article updated successfully",
      data: result,
    });
  }
);

/**
 * DELETE GUIDE ARTICLE
 */
const deleteGuideArticle = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ResourceServices.deleteGuideArticle(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Guide article deleted successfully",
      data: result,
    });
  }
);


/**
 * GET ALL TOOLS
 */
 const getAllTools = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await ResourceServices.getAllTools(query as Record<string, string>);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tools retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

/**
 * CREATE TOOL
 */
 const createTool = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await ResourceServices.createTool(payload);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Tool created successfully",
    data: result,
  });
});

/**
 * UPDATE TOOL
 */
 const updateTool = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await ResourceServices.updateTool(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tool updated successfully",
    data: result,
  });
});

/**
 * DELETE TOOL
 */
 const deleteTool = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await ResourceServices.deleteTool(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tool deleted successfully",
    data: result,
  });
});


export const ResourceControllers = {
  getAllGuideArticles,
  createGuideArticle,
  updateGuideArticle,
  deleteGuideArticle,
  createTool,
  updateTool,
  deleteTool,
  getAllTools
};

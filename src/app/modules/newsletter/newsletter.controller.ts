import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { NewsletterServices } from "./newsletter.service";

const createNewsletter = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await NewsletterServices.createNewsletter(payload);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Subscribed to newsletter successfully",
      data: result,
    });
  }
);

const getAllNewsletters = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;

    const result = await NewsletterServices.getAllNewsletters(
      query as Record<string, string>
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Newsletter list retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const deleteNewsletter = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await NewsletterServices.deleteNewsletter(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Newsletter email deleted successfully",
      data: result,
    });
  }
);

export const NewsletterControllers = {
  createNewsletter,
  getAllNewsletters,
  deleteNewsletter,
};

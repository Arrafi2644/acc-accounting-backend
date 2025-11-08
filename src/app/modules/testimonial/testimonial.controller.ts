

import httpStatus from "http-status-codes";
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TestimonialServices } from "./testimonial.service";

const getAllTestimonials = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;

    const result = await TestimonialServices.getAllTestimonials(query as Record<string, string>);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Testimonials retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
});


const createTestimonial = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await TestimonialServices.createTestimonial(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Testimonial created successfully",
        data: result,
    });
});

const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await TestimonialServices.updateTestimonial(id, payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Testimonial updated successfully",
        data: result,
    });
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TestimonialServices.deleteTestimonial(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Testimonial deleted successfully",
        data: result,
    });
});

export const TestimonialControllers = {
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
};

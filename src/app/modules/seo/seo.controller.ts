import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from 'express';
import { SEOServices } from './seo.service';

// Get SEO info for a page
const getSEO = catchAsync(async (req: Request, res: Response) => {
    const { pagePath } = req.params;
    const result = await SEOServices.getSEO(pagePath);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SEO information retrieved successfully',
        data: result,
    });
});

// Create SEO info for a page
const createSEO = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await SEOServices.createSEO(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'SEO information created successfully',
        data: result,
    });
});

// Update SEO info for a page
// const updateSEO = catchAsync(async (req: Request, res: Response) => {
//     const payload = req.body;
//     const result = await SEOServices.updateSEO(payload);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'SEO information updated successfully',
//         data: result,
//     });
// });

const updateSEO = catchAsync(async (req: Request, res: Response) => {
    const { pagePath } = req.params;
    const payload = req.body; // Only fields to update
    const result = await SEOServices.updateSEO(pagePath, payload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SEO information updated successfully',
        data: result,
    });
});

const deleteSEO = catchAsync(async (req: Request, res: Response) => {
    const { pagePath } = req.params;
    const result = await SEOServices.deleteSEO(pagePath);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'SEO information deleted successfully',
        data: result,
    });
});

export const SEOControllers = {
    getSEO,
    createSEO,
    updateSEO,
    deleteSEO
};

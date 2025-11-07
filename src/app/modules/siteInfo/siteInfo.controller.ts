import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from 'express';
import { SiteInfoServices } from './siteInfo.service';

// Get site/admin info
const getSiteInfo = catchAsync(async (req: Request, res: Response) => {
    const result = await SiteInfoServices.getSiteInfo();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Site information retrieved successfully',
        data: result,
    });
});

// Create site/admin info
const createSiteInfo = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await SiteInfoServices.createSiteInfo(payload);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Site information created successfully',
        data: result,
    });
});

// Update site/admin info
const updateSiteInfo = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await SiteInfoServices.updateSiteInfo(payload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Site information updated successfully',
        data: result,
    });
});

export const SiteInfoControllers = {
    getSiteInfo,
    createSiteInfo,
    updateSiteInfo,
};

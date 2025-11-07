import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from 'express';
import { ReferralFormServices } from './referalForm.service';

const submitReferralForm = catchAsync(async (req: Request, res: Response) => {
    const result = await ReferralFormServices.submitReferralForm(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Form submitted successfully',
        data: result,
    });
});

const getAllReferralForm = catchAsync(async (req: Request, res: Response) => {
  const query = req.query

    const result = await ReferralFormServices.getAllReferralForm(query as Record<string, string>);
    
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All referral form retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
})

export const ReferralFormControllers = {
    submitReferralForm,
    getAllReferralForm
}
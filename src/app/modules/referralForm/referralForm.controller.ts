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

const getSingleReferralForm = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await ReferralFormServices.getSingleReferralForm(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Referral retrieved successfully",
        data: result,
    });
});

const deleteReferralForm = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await ReferralFormServices.deleteReferralForm(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Referral deleted successfully",
        data: result,
    });
});

export const ReferralFormControllers = {
    submitReferralForm,
    getAllReferralForm,
    deleteReferralForm,
    getSingleReferralForm
}
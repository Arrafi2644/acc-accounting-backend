import httpStatus from 'http-status-codes';
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { JoinUsFormServices } from './joinUsForm.service';

const submitJoinUsForm = catchAsync(async (req: Request, res: Response) => {
    const result = await JoinUsFormServices.submitJoinUsForm(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Form submitted successfully',
        data: result,
    });
});

const getAllSubmittedFormData = catchAsync(async (req: Request, res: Response) => {
    const result = await JoinUsFormServices.getAllSubmittedFormData();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Form Data Retrieved Successfully",
        data: result.data
    })
})


export const JoinUsFormControllers = {
submitJoinUsForm,
getAllSubmittedFormData
}
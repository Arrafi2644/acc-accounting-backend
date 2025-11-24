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
        message: 'Form retrieved successfully',
        data: result,
    });
});

const getSingleJoinUsForm = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;

    // Call service to get single form
    const result = await JoinUsFormServices.getSingleJoinUsForm(id);

    // Send response
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Form fetched successfully",
        data: result,
    });
});

const getAllSubmittedFormData = catchAsync(async (req: Request, res: Response) => {
   const query = req.query;

    const result = await JoinUsFormServices.getAllSubmittedFormData(query as Record<string, string>);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All forms data retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
})

const deleteJoinUsForm = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await JoinUsFormServices.deleteJoinUsForm(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Form deleted successfully",
        data: result,
    });
});


export const JoinUsFormControllers = {
submitJoinUsForm,
getAllSubmittedFormData,
getSingleJoinUsForm,
deleteJoinUsForm
}
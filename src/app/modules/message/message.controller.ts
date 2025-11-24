import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { Request, Response } from 'express';
import { MessageFormServices } from './message.service';

const submitMessageForm = catchAsync(async (req: Request, res: Response) => {
    const result = await MessageFormServices.submitMessageForm(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Message submitted successfully',
        data: result,
    });
});

const getAllMessageForm = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;

    const result = await MessageFormServices.getAllMessageForm(query as Record<string, string>);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All messages retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});


const getSingleMessage = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await MessageFormServices.getSingleMessage(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Message retrieved successfully",
        data: result,
    });
});

const deleteMessage = catchAsync(async (req: Request, res: Response) => {
    const id: string = req.params.id;

    const result = await MessageFormServices.deleteMessage(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Message deleted successfully",
        data: result,
    });
});

export const MessageFormControllers = {
    submitMessageForm,
    getAllMessageForm,
    deleteMessage,
    getSingleMessage
};

import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";


const createServiceType = catchAsync(async (req: Request, res: Response) => {
    const name = req.body;
    const result = await ServiceServices.createServiceType(name);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Service type created successfully',
        data: result,
    });
});

const getAllServiceTypes = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceServices.getAllServiceTypes();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All service types retrieved successfully',
        data: result,
    });
});

const updateServiceType = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const name = req.body;
    const result = await ServiceServices.updateServiceType(id, name);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service type updated successfully',
        data: result,
    });
});

const deleteServiceType = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ServiceServices.deleteServiceType(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Service type deleted successfully',
        data: result,
    });
});

export const ServiceControllers = {
    createServiceType,
    getAllServiceTypes,
    updateServiceType,
    deleteServiceType
}
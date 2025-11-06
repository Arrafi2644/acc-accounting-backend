import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";
import { IService } from './service.interface';

// Service Types  
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

// Services  
const createService = catchAsync(async (req: Request, res: Response) => {

    const payload: IService = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }
    const result = await ServiceServices.createService(payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Service created successfully',
        data: result
    });
});

const getSingleService = catchAsync(async (req: Request, res: Response) => {

    const serviceId = req.params.id
    const result = await ServiceServices.getSingleService(serviceId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: result
    });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
         const payload: IService = {
        ...req.body,
        images: (req.files as Express.Multer.File[]).map(file => file.path)
    }

    const result = await ServiceServices.updateService(req.params.id, payload);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Service updated successfully',
        data: result
    });
});
export const ServiceControllers = {
    createServiceType,
    getAllServiceTypes,
    updateServiceType,
    deleteServiceType,
    createService,
    getSingleService,
    updateService
}
import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { IServiceType } from "./service.interface";
import { ServiceType } from "./service.model";

const createServiceType = async (payload: IServiceType) => {

    const existingServiceType = await ServiceType.findOne({ name: payload.name });

    if (existingServiceType) {
        throw new Error("Service type already exists.");
    }

    return await ServiceType.create(payload);
};

const getAllServiceTypes = async () => {
    return await ServiceType.find();
};

const updateServiceType = async (id: string, payload: IServiceType) => {
    const existingServiceType = await ServiceType.findById(id);
    if (!existingServiceType) {
        throw new AppError(httpStatus.NOT_FOUND, "Service type not found.");
    }

    const updatedServiceType = await ServiceType.findByIdAndUpdate(id, payload, { new: true });
    return updatedServiceType;
};

const deleteServiceType = async (id: string) => {
    const existingServiceType = await ServiceType.findById(id);
    if (!existingServiceType) {
        throw new Error("Service type not found.");
    }

    return await ServiceType.findByIdAndDelete(id);
};

export const ServiceServices = {
    createServiceType,
    getAllServiceTypes,
    updateServiceType,
    deleteServiceType
}
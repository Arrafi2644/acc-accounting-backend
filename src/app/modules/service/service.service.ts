import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { IService, IServiceType } from "./service.interface";
import { Service, ServiceType } from "./service.model";
import { deleteImageFromCloudinary } from '../../config/cloudinary.config';
import { QueryBuilder } from '../../utils/queryBuilder';
import { ServicesSearchableFields } from './service.constants';
import mongoose from 'mongoose';


// Service Type 
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

const  deleteServiceType = async (id: string) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existingServiceType = await ServiceType.findById(id).session(session);
        if (!existingServiceType) {
            throw new AppError(httpStatus.NOT_FOUND, "Service type not found.");
        }

        await Service.deleteMany({ serviceType: id }).session(session);
        await ServiceType.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();

        return { message: "Service type and related services deleted successfully" };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};



// Service 
const createService = async (payload: IService) => {
    const existingService = await Service.findOne({ title: payload.title });
    if (existingService) {
        throw new Error("A service with this title already exists.");
    }

    const service = await Service.create(payload)

    return service;
};

const getSingleService = async (serviceId: string) => {
    
    const service = await Service.findById(serviceId).populate("serviceType", "name")

    if(!service){
        throw new AppError(httpStatus.NOT_FOUND, "Service not found")
    }

    return service;
};

const updateService = async (id: string, payload: Partial<IService>) => {

    const existingService = await Service.findById(id);

    if (!existingService) {
        throw new Error("Service not found.");
    }

    if (payload.images && payload.images.length > 0 && existingService.images && existingService.images.length > 0) {
        payload.images = [...payload.images, ...existingService.images]
    }

    if (payload.deleteImages && payload.deleteImages?.length > 0 && existingService.images && existingService.images.length > 0) {
        const restDBImages = existingService.images.filter(imageUrl => !payload.deleteImages?.includes(imageUrl))

        const updatedPayloadImages = (payload.images || [])
            .filter(imageUrl => !payload.deleteImages?.includes(imageUrl))
            .filter(imageUrl => !restDBImages.includes(imageUrl))

        payload.images = [...restDBImages, ...updatedPayloadImages]

    }

    const updatedService = await Service.findByIdAndUpdate(id, payload, { new: true });

    if (payload.deleteImages && payload.deleteImages.length > 0 && existingService.images && existingService.images.length > 0) {
        await Promise.all(payload.deleteImages.map(url => deleteImageFromCloudinary(url)))
    }

    return updatedService;
}; 

const getAllServices = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(Service.find(), query)

    const services = await queryBuilder
        .search(ServicesSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        services.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};
export const ServiceServices = {
    createServiceType,
    getAllServiceTypes,
    updateServiceType,
    deleteServiceType,
    createService,
    getSingleService,
    updateService,
    getAllServices
}
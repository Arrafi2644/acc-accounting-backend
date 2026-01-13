import httpStatus from 'http-status-codes';
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";
import { IService } from './service.interface';
import { createServiceZodSchema, updateServiceZodSchema } from './service.validation';
import AppError from '../../errorHelpers/appError';
import { Service } from './service.model';
import { deleteImageFromCloudinary } from '../../config/cloudinary.config';

// Services 

const createService = catchAsync(async (req: Request, res: Response) => {
  //  Parse JSON data
  const data = req.body.data ? JSON.parse(req.body.data) : req.body;

  // Only allowed file (service image)
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const serviceImage = files?.serviceImage?.[0]?.path;
  if (!serviceImage) {
  throw new AppError(400, "Service image is required");
}

  //  Build payload (NO extra fields)
  const payload: IService = {
    title: data.title,
    serviceSummary: data.serviceSummary,
    shortDescription: data.shortDescription,

    // string icon (not file)
    serviceIcon: data.serviceIcon,

    banner: {
      title: data.banner.title,
      subtitle: data.banner.subtitle,
    },

    overView: {
      title: data.overView.title,
      description: data.overView.description,
      features: data.overView.features,
      serviceImage: serviceImage, // required
    },

    serviceMatter: data.serviceMatter,
    features: data.features,
    processSteps: data.processSteps,
    requirementDocs: data.requirementDocs,
    faqs: data.faqs,
  };

  // Zod validation
  const parsed = createServiceZodSchema.safeParse(payload);
  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues.map(i => `${i.path.join(".")} ${i.message}`).join(", ")
    );
  }

  // Save to DB
  const result = await ServiceServices.createService(parsed.data);

  // Response
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Service created successfully!",
    data: result,
  });
});



const updateService = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.id;

  // Parse JSON data
  const data = req.body.data ? JSON.parse(req.body.data) : req.body;

  //  Only image file (NO icon files)
  const files = req.files as Record<string, Express.Multer.File[]> | undefined;
  const serviceImage = files?.serviceImage?.[0]?.path;

  // Fetch existing service
  const existingServiceDoc = await Service.findById(serviceId);
  if (!existingServiceDoc) {
    throw new AppError(404, "Service not found");
  }

  const existingService = existingServiceDoc.toObject();

  // Merge payload
  const payload: Partial<IService> = {
    title: data.title ?? existingService.title,
    serviceSummary: data.serviceSummary ?? existingService.serviceSummary,
    shortDescription: data.shortDescription ?? existingService.shortDescription,

    // serviceIcon is STRING, not file
    serviceIcon: data.serviceIcon ?? existingService.serviceIcon,

    banner: {
      ...existingService.banner,
      ...(data.banner ?? {}),
    },

    overView: {
      ...existingService.overView,
      ...(data.overView ?? {}),
      serviceImage: serviceImage ?? existingService.overView.serviceImage,
    },

    serviceMatter: data.serviceMatter ?? existingService.serviceMatter,
    features: data.features ?? existingService.features,
    processSteps: data.processSteps ?? existingService.processSteps,
    requirementDocs: data.requirementDocs ?? existingService.requirementDocs,
    faqs: data.faqs ?? existingService.faqs,
  };

  // Zod validation
  const parsed = updateServiceZodSchema.safeParse(payload);
  if (!parsed.success) {
    throw new AppError(
      400,
      parsed.error.issues
        .map(i => `${i.path.join(".")} ${i.message}`)
        .join(", ")
    );
  }

  // Update DB
  const updatedService = await ServiceServices.updateService(
    serviceId,
    parsed.data
  );

  if (!updatedService) {
    throw new AppError(500, "Failed to update service");
  }

  // Delete old image if replaced
  if (serviceImage && existingService.overView.serviceImage) {
    await deleteImageFromCloudinary(existingService.overView.serviceImage);
  }

  // Response
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Service updated successfully!",
    data: updatedService,
  });
});


const getSingleService = catchAsync(async (req: Request, res: Response) => {

    const serviceSlug = req.params.slug
    const result = await ServiceServices.getSingleService(serviceSlug);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: result
    });
});


const getAllServices = catchAsync(async (req: Request, res: Response) => {

    const query = req.query

    const result = await ServiceServices.getAllServices(query as Record<string, string>);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Services retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

const deleteService = catchAsync(async (req: Request, res: Response) => {

    const serviceId = req.params.id
    const result = await ServiceServices.deleteService(serviceId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Service Deleted successfully',
        data: result
    });
});

export const ServiceControllers = {
    createService,
    getSingleService,
    updateService,
    getAllServices,
    deleteService
}
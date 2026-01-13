"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const service_service_1 = require("./service.service");
const service_validation_1 = require("./service.validation");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const service_model_1 = require("./service.model");
const cloudinary_config_1 = require("../../config/cloudinary.config");
// Services 
const createService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //  Parse JSON data
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;
    // Only allowed file (service image)
    const files = req.files;
    const serviceImage = (_b = (_a = files === null || files === void 0 ? void 0 : files.serviceImage) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path;
    if (!serviceImage) {
        throw new appError_1.default(400, "Service image is required");
    }
    //  Build payload (NO extra fields)
    const payload = {
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
    const parsed = service_validation_1.createServiceZodSchema.safeParse(payload);
    if (!parsed.success) {
        throw new appError_1.default(400, parsed.error.issues.map(i => `${i.path.join(".")} ${i.message}`).join(", "));
    }
    // Save to DB
    const result = yield service_service_1.ServiceServices.createService(parsed.data);
    // Response
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Service created successfully!",
        data: result,
    });
}));
const updateService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    const serviceId = req.params.id;
    // Parse JSON data
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;
    //  Only image file (NO icon files)
    const files = req.files;
    const serviceImage = (_b = (_a = files === null || files === void 0 ? void 0 : files.serviceImage) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path;
    // Fetch existing service
    const existingServiceDoc = yield service_model_1.Service.findById(serviceId);
    if (!existingServiceDoc) {
        throw new appError_1.default(404, "Service not found");
    }
    const existingService = existingServiceDoc.toObject();
    // Merge payload
    const payload = {
        title: (_c = data.title) !== null && _c !== void 0 ? _c : existingService.title,
        serviceSummary: (_d = data.serviceSummary) !== null && _d !== void 0 ? _d : existingService.serviceSummary,
        shortDescription: (_e = data.shortDescription) !== null && _e !== void 0 ? _e : existingService.shortDescription,
        // serviceIcon is STRING, not file
        serviceIcon: (_f = data.serviceIcon) !== null && _f !== void 0 ? _f : existingService.serviceIcon,
        banner: Object.assign(Object.assign({}, existingService.banner), ((_g = data.banner) !== null && _g !== void 0 ? _g : {})),
        overView: Object.assign(Object.assign(Object.assign({}, existingService.overView), ((_h = data.overView) !== null && _h !== void 0 ? _h : {})), { serviceImage: serviceImage !== null && serviceImage !== void 0 ? serviceImage : existingService.overView.serviceImage }),
        serviceMatter: (_j = data.serviceMatter) !== null && _j !== void 0 ? _j : existingService.serviceMatter,
        features: (_k = data.features) !== null && _k !== void 0 ? _k : existingService.features,
        processSteps: (_l = data.processSteps) !== null && _l !== void 0 ? _l : existingService.processSteps,
        requirementDocs: (_m = data.requirementDocs) !== null && _m !== void 0 ? _m : existingService.requirementDocs,
        faqs: (_o = data.faqs) !== null && _o !== void 0 ? _o : existingService.faqs,
    };
    // Zod validation
    const parsed = service_validation_1.updateServiceZodSchema.safeParse(payload);
    if (!parsed.success) {
        throw new appError_1.default(400, parsed.error.issues
            .map(i => `${i.path.join(".")} ${i.message}`)
            .join(", "));
    }
    // Update DB
    const updatedService = yield service_service_1.ServiceServices.updateService(serviceId, parsed.data);
    if (!updatedService) {
        throw new appError_1.default(500, "Failed to update service");
    }
    // Delete old image if replaced
    if (serviceImage && existingService.overView.serviceImage) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingService.overView.serviceImage);
    }
    // Response
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: "Service updated successfully!",
        data: updatedService,
    });
}));
const getSingleService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceSlug = req.params.slug;
    const result = yield service_service_1.ServiceServices.getSingleService(serviceSlug);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Service retrieved successfully',
        data: result
    });
}));
const getAllServices = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield service_service_1.ServiceServices.getAllServices(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Services retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
}));
const deleteService = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceId = req.params.id;
    const result = yield service_service_1.ServiceServices.deleteService(serviceId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Service Deleted successfully',
        data: result
    });
}));
exports.ServiceControllers = {
    createService,
    getSingleService,
    updateService,
    getAllServices,
    deleteService
};

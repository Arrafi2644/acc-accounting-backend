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
exports.ServiceServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const service_model_1 = require("./service.model");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const queryBuilder_1 = require("../../utils/queryBuilder");
const service_constants_1 = require("./service.constants");
const mongoose_1 = __importDefault(require("mongoose"));
// Service Type 
const createServiceType = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingServiceType = yield service_model_1.ServiceType.findOne({ name: payload.name });
    if (existingServiceType) {
        throw new Error("Service type already exists.");
    }
    return yield service_model_1.ServiceType.create(payload);
});
const getAllServiceTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield service_model_1.ServiceType.find();
});
const updateServiceType = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingServiceType = yield service_model_1.ServiceType.findById(id);
    if (!existingServiceType) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Service type not found.");
    }
    const updatedServiceType = yield service_model_1.ServiceType.findByIdAndUpdate(id, payload, { new: true });
    return updatedServiceType;
});
const deleteServiceType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const existingServiceType = yield service_model_1.ServiceType.findById(id).session(session);
        if (!existingServiceType) {
            throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Service type not found.");
        }
        yield service_model_1.Service.deleteMany({ serviceType: id }).session(session);
        yield service_model_1.ServiceType.findByIdAndDelete(id).session(session);
        yield session.commitTransaction();
        session.endSession();
        return { message: "Service type and related services deleted successfully" };
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Service 
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield service_model_1.Service.findOne({ title: payload.title });
    if (existingService) {
        throw new Error("A service with this title already exists.");
    }
    const service = yield service_model_1.Service.create(payload);
    return service;
});
const getSingleService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(serviceId).populate("serviceType", "name");
    if (!service) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Service not found");
    }
    return service;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const existingService = yield service_model_1.Service.findById(id);
    if (!existingService) {
        throw new Error("Service not found.");
    }
    if (payload.images && payload.images.length > 0 && existingService.images && existingService.images.length > 0) {
        payload.images = [...payload.images, ...existingService.images];
    }
    if (payload.deleteImages && ((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.length) > 0 && existingService.images && existingService.images.length > 0) {
        const restDBImages = existingService.images.filter(imageUrl => { var _a; return !((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.includes(imageUrl)); });
        const updatedPayloadImages = (payload.images || [])
            .filter(imageUrl => { var _a; return !((_a = payload.deleteImages) === null || _a === void 0 ? void 0 : _a.includes(imageUrl)); })
            .filter(imageUrl => !restDBImages.includes(imageUrl));
        payload.images = [...restDBImages, ...updatedPayloadImages];
    }
    const updatedService = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true });
    if (payload.deleteImages && payload.deleteImages.length > 0 && existingService.images && existingService.images.length > 0) {
        yield Promise.all(payload.deleteImages.map(url => (0, cloudinary_config_1.deleteImageFromCloudinary)(url)));
    }
    return updatedService;
});
const getAllServices = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(service_model_1.Service.find(), query);
    const services = yield queryBuilder
        .search(service_constants_1.ServicesSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        services.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
exports.ServiceServices = {
    createServiceType,
    getAllServiceTypes,
    updateServiceType,
    deleteServiceType,
    createService,
    getSingleService,
    updateService,
    getAllServices
};

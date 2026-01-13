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
const queryBuilder_1 = require("../../utils/queryBuilder");
const service_constants_1 = require("./service.constants");
// Service 
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingService = yield service_model_1.Service.findOne({ title: payload.title });
    if (existingService) {
        throw new Error("A service with this title already exists.");
    }
    const service = yield service_model_1.Service.create(payload);
    return service;
});
const getSingleService = (serviceSlug) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findOne({ slug: serviceSlug });
    if (!service) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Service not found");
    }
    return service;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedService = yield service_model_1.Service.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!updatedService) {
        throw new appError_1.default(404, "Service not found");
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
const deleteService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Service not found");
    }
    yield service.deleteOne();
    return null;
});
exports.ServiceServices = {
    createService,
    getSingleService,
    updateService,
    getAllServices,
    deleteService
};

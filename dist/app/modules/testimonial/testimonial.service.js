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
exports.TestimonialServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const testimonial_model_1 = require("./testimonial.model");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const queryBuilder_1 = require("../../utils/queryBuilder");
const testimonial_constants_1 = require("./testimonial.constants");
// 🟡 Create testimonial
const createTestimonial = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTestimonial = yield testimonial_model_1.Testimonial.findOne({
        fullName: payload.fullName,
        email: payload.email,
        message: payload.message,
    });
    if (existingTestimonial) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "A similar testimonial already exists.");
    }
    const testimonial = yield testimonial_model_1.Testimonial.create(payload);
    return testimonial;
});
const updateTestimonial = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTestimonial = yield testimonial_model_1.Testimonial.findById(id);
    if (!existingTestimonial) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Testimonial not found");
    }
    const updatedTestimonial = yield testimonial_model_1.Testimonial.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedTestimonial) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Failed to update testimonial");
    }
    return updatedTestimonial;
});
const getAllTestimonials = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(testimonial_model_1.Testimonial.find(), query);
    const testimonials = yield queryBuilder
        .search(testimonial_constants_1.TestimonialSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        testimonials.build(),
        queryBuilder.getMeta(),
    ]);
    return { data, meta };
});
const deleteTestimonial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const testimonial = yield testimonial_model_1.Testimonial.findById(id);
    if (!testimonial) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Testimonial not found");
    }
    const deleted = yield testimonial_model_1.Testimonial.findByIdAndDelete(id);
    if (!deleted) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, "Failed to delete testimonial");
    }
    return deleted;
});
exports.TestimonialServices = {
    createTestimonial,
    updateTestimonial,
    getAllTestimonials,
    deleteTestimonial,
};

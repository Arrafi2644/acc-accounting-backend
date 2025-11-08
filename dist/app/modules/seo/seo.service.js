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
exports.SEOServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const seo_model_1 = require("./seo.model");
const getSEO = (pagePath) => __awaiter(void 0, void 0, void 0, function* () {
    const seo = yield seo_model_1.SEO.findOne({ pagePath });
    if (!seo) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "SEO info not found for this path");
    }
    return seo;
});
const createSEO = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield seo_model_1.SEO.findOne({ pagePath: payload.pagePath });
    if (existing) {
        throw new appError_1.default(http_status_codes_1.default.CONFLICT, "SEO info for this page already exists. Use update instead.");
    }
    const newSEO = yield seo_model_1.SEO.create(payload);
    return newSEO;
});
// const updateSEO = async (payload: ISEO): Promise<ISEO> => {
//     const existing = await SEO.findOne({ pagePath: payload.pagePath });
//     if (!existing) {
//         throw new AppError(httpStatus.NOT_FOUND, "No SEO info found for this page. Use create first.");
//     }
//     const updated = await SEO.findByIdAndUpdate(
//         existing._id,
//         payload,
//         { new: true, runValidators: true } // return the updated document
//     );
//     if (!updated) {
//         throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update SEO info.");
//     }
//     return updated;
// };
const updateSEO = (pagePath, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield seo_model_1.SEO.findOne({ pagePath });
    if (!existing) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "No SEO info found for this page. Use create first.");
    }
    const updated = yield seo_model_1.SEO.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true });
    if (!updated) {
        throw new appError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "Failed to update SEO info.");
    }
    return updated;
});
const deleteSEO = (pagePath) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield seo_model_1.SEO.findOne({ pagePath });
    if (!existing) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "No SEO info found for this page.");
    }
    const deleted = yield seo_model_1.SEO.findByIdAndDelete(existing._id);
    if (!deleted) {
        throw new appError_1.default(http_status_codes_1.default.INTERNAL_SERVER_ERROR, "Failed to delete SEO info.");
    }
    return deleted;
});
exports.SEOServices = {
    getSEO,
    createSEO,
    updateSEO,
    deleteSEO
};

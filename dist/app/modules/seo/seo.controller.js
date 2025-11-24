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
exports.SEOControllers = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const seo_service_1 = require("./seo.service");
// Get SEO info for a page
const getSinglePageSEO = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagePath } = req.params;
    const result = yield seo_service_1.SEOServices.getSinglePageSEO(pagePath);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'SEO information retrieved successfully',
        data: result,
    });
}));
// Create SEO info for a page
const createSEO = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield seo_service_1.SEOServices.createSEO(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: 'SEO information created successfully',
        data: result,
    });
}));
// Update SEO info for a page
// const updateSEO = catchAsync(async (req: Request, res: Response) => {
//     const payload = req.body;
//     const result = await SEOServices.updateSEO(payload);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'SEO information updated successfully',
//         data: result,
//     });
// });
const updateSEO = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield seo_service_1.SEOServices.updateSEO(id, payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'SEO information updated successfully',
        data: result,
    });
}));
const deleteSEO = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagePath } = req.params;
    const result = yield seo_service_1.SEOServices.deleteSEO(pagePath);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'SEO information deleted successfully',
        data: result,
    });
}));
const getAllSeo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield seo_service_1.SEOServices.getAllSeo(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "SEO data retrieved successfully",
        data: result.data,
        meta: result.meta,
    });
}));
exports.SEOControllers = {
    getSinglePageSEO,
    createSEO,
    updateSEO,
    deleteSEO,
    getAllSeo
};

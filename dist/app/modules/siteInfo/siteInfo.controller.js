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
exports.SiteInfoControllers = exports.updateSiteInfo = exports.createSiteInfo = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const siteInfo_service_1 = require("./siteInfo.service");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const siteInfo_validation_1 = require("./siteInfo.validation");
const cloudinary_config_1 = require("../../config/cloudinary.config");
const siteInfo_model_1 = require("./siteInfo.model");
// Get site/admin info
const getSiteInfo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield siteInfo_service_1.SiteInfoServices.getSiteInfo();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'Site information retrieved successfully',
        data: result,
    });
}));
// Create site/admin info
// const createSiteInfo = catchAsync(async (req: Request, res: Response) => {
//     const payload = req.body;
//     const result = await SiteInfoServices.createSiteInfo(payload);
//     sendResponse(res, {
//         statusCode: httpStatus.CREATED,
//         success: true,
//         message: 'Site information created successfully',
//         data: result,
//     });
// });
// // Update site/admin info
// const updateSiteInfo = catchAsync(async (req: Request, res: Response) => {
//     const payload = req.body;
//     const result = await SiteInfoServices.updateSiteInfo(payload);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Site information updated successfully',
//         data: result,
//     });
// });
// Create Site/Admin Info
exports.createSiteInfo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    // Parse JSON data
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;
    // File uploads
    const files = req.files;
    const mainLogo = (_b = (_a = files === null || files === void 0 ? void 0 : files.mainLogo) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.path;
    const faviconLogo = (_d = (_c = files === null || files === void 0 ? void 0 : files.faviconLogo) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.path;
    const footerLogo = (_f = (_e = files === null || files === void 0 ? void 0 : files.footerLogo) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.path;
    if (!mainLogo || !footerLogo) {
        throw new appError_1.default(400, "Main logo and Footer logo are required");
    }
    // Build payload
    const payload = Object.assign(Object.assign({}, data), { mainLogo,
        faviconLogo,
        footerLogo });
    // Zod validation
    const parsed = siteInfo_validation_1.createSiteInfoSchema.safeParse(payload);
    if (!parsed.success) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, parsed.error.issues.map(i => `${i.path.join(".")} ${i.message}`).join(", "));
    }
    // Save to DB
    const result = yield siteInfo_service_1.SiteInfoServices.createSiteInfo(parsed.data);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.CREATED,
        success: true,
        message: "Site information created successfully",
        data: result,
    });
}));
// Update Site/Admin Info
exports.updateSiteInfo = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;
    const existingDoc = yield siteInfo_model_1.SiteInfo.findOne();
    if (!existingDoc) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Site information not found");
    }
    const files = req.files;
    const payload = Object.assign({}, data);
    if ((_a = files === null || files === void 0 ? void 0 : files.mainLogo) === null || _a === void 0 ? void 0 : _a[0]) {
        payload.mainLogo = files.mainLogo[0].path;
    }
    if ((_b = files === null || files === void 0 ? void 0 : files.faviconLogo) === null || _b === void 0 ? void 0 : _b[0]) {
        payload.faviconLogo = files.faviconLogo[0].path;
    }
    if ((_c = files === null || files === void 0 ? void 0 : files.footerLogo) === null || _c === void 0 ? void 0 : _c[0]) {
        payload.footerLogo = files.footerLogo[0].path;
    }
    // Zod validation (partial)
    const parsed = siteInfo_validation_1.updateSiteInfoSchema.safeParse(payload);
    if (!parsed.success) {
        throw new appError_1.default(http_status_codes_1.default.BAD_REQUEST, parsed.error.issues.map(i => `${i.path.join(".")} ${i.message}`).join(", "));
    }
    const updatedDoc = yield siteInfo_service_1.SiteInfoServices.updateSiteInfo(parsed.data);
    // Delete old images only if replaced
    if (payload.mainLogo && existingDoc.mainLogo) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingDoc.mainLogo);
    }
    if (payload.faviconLogo && existingDoc.faviconLogo) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingDoc.faviconLogo);
    }
    if (payload.footerLogo && existingDoc.footerLogo) {
        yield (0, cloudinary_config_1.deleteImageFromCloudinary)(existingDoc.footerLogo);
    }
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "Site information updated successfully",
        data: updatedDoc,
    });
}));
exports.SiteInfoControllers = {
    getSiteInfo,
    createSiteInfo: exports.createSiteInfo,
    updateSiteInfo: exports.updateSiteInfo,
};

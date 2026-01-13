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
exports.SiteInfoServices = void 0;
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const siteInfo_model_1 = require("./siteInfo.model");
const getSiteInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const siteInfo = yield siteInfo_model_1.SiteInfo.findOne();
    return siteInfo;
});
// const createSiteInfo = async (payload: ISiteInfo): Promise<ISiteInfo> => {
//     const existing = await SiteInfo.findOne();
//     if (existing) {
//         throw new AppError(httpStatus.CONFLICT, "Site info already exists. Use update instead.");
//     }
//     const newSiteInfo = await SiteInfo.create(payload);
//     return newSiteInfo;
// };
// const updateSiteInfo = async (payload: ISiteInfo): Promise<ISiteInfo> => {
//     const existing = await SiteInfo.findOne();
//     if (!existing) {
//         throw new AppError(httpStatus.NOT_FOUND, "No site info found. Use create first.");
//     }
//     const updated = await SiteInfo.findByIdAndUpdate(
//         existing._id,
//         payload,
//         { new: true, runValidators: true } // return the updated document
//     );
//     if (!updated) {
//         throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update site info.");
//     }
//     return updated;
// };
// Create SiteInfo
const createSiteInfo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Optional: check if a SiteInfo already exists (singleton)
    const existing = yield siteInfo_model_1.SiteInfo.findOne();
    if (existing) {
        throw new appError_1.default(400, "Site information already exists. You can only update it.");
    }
    const siteInfo = yield siteInfo_model_1.SiteInfo.create(payload);
    return siteInfo;
});
// Update SiteInfo
const updateSiteInfo = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedSiteInfo = yield siteInfo_model_1.SiteInfo.findOneAndUpdate({}, payload, { new: true, runValidators: true });
    if (!updatedSiteInfo) {
        throw new appError_1.default(404, "Site information not found");
    }
    return updatedSiteInfo;
});
exports.SiteInfoServices = {
    getSiteInfo,
    createSiteInfo,
    updateSiteInfo
};

import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { ISiteInfo } from "./siteInfo.interface";
import { SiteInfo } from "./siteInfo.model";

const getSiteInfo = async (): Promise<ISiteInfo | null> => {
    const siteInfo = await SiteInfo.findOne();
    return siteInfo;
};

const createSiteInfo = async (payload: ISiteInfo): Promise<ISiteInfo> => {
    const existing = await SiteInfo.findOne();
    if (existing) {
        throw new AppError(httpStatus.CONFLICT, "Site info already exists. Use update instead.");
    }
    const newSiteInfo = await SiteInfo.create(payload);
    return newSiteInfo;
};


const updateSiteInfo = async (payload: ISiteInfo): Promise<ISiteInfo> => {
    const existing = await SiteInfo.findOne();

    if (!existing) {
        throw new AppError(httpStatus.NOT_FOUND, "No site info found. Use create first.");
    }

    const updated = await SiteInfo.findByIdAndUpdate(
        existing._id,
        payload,
        { new: true, runValidators: true } // return the updated document
    );

    if (!updated) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update site info.");
    }

    return updated;
};

export const SiteInfoServices = {
    getSiteInfo,
    createSiteInfo,
    updateSiteInfo,
};

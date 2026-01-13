import AppError from "../../errorHelpers/appError";
import { ISiteInfo } from "./siteInfo.interface";
import { SiteInfo } from "./siteInfo.model";

const getSiteInfo = async (): Promise<ISiteInfo | null> => {
    const siteInfo = await SiteInfo.findOne();
    return siteInfo;
};

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
const createSiteInfo = async (payload: ISiteInfo) => {
    // Optional: check if a SiteInfo already exists (singleton)
    const existing = await SiteInfo.findOne();
    if (existing) {
        throw new AppError(400, "Site information already exists. You can only update it.");
    }

    const siteInfo = await SiteInfo.create(payload);
    return siteInfo;
};

// Update SiteInfo
const updateSiteInfo = async (payload: Partial<ISiteInfo>) => {
  const updatedSiteInfo = await SiteInfo.findOneAndUpdate(
    {},
    payload,
    { new: true, runValidators: true }
  );

  if (!updatedSiteInfo) {
    throw new AppError(404, "Site information not found");
  }

  return updatedSiteInfo;
};


export const SiteInfoServices = {
    getSiteInfo,
    createSiteInfo,
    updateSiteInfo
};

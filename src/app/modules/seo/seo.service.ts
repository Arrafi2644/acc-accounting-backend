import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { ISEO } from "./seo.interface";
import { SEO } from "./seo.model";

const getSEO = async (pagePath: string): Promise<ISEO | null> => {
    const seo = await SEO.findOne({ pagePath });
    if(!seo){
        throw new AppError(httpStatus.NOT_FOUND, "SEO info not found for this path")
    }
    return seo;
};

const createSEO = async (payload: ISEO): Promise<ISEO> => {
    const existing = await SEO.findOne({ pagePath: payload.pagePath });
    if (existing) {
        throw new AppError(httpStatus.CONFLICT, "SEO info for this page already exists. Use update instead.");
    }
    const newSEO = await SEO.create(payload);
    return newSEO;
};

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

const updateSEO = async (pagePath: string, payload: Partial<ISEO>): Promise<ISEO> => {
    const existing = await SEO.findOne({ pagePath });

    if (!existing) {
        throw new AppError(httpStatus.NOT_FOUND, "No SEO info found for this page. Use create first.");
    }

    const updated = await SEO.findByIdAndUpdate(
        existing._id,
        payload,
        { new: true, runValidators: true }
    );

    if (!updated) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to update SEO info.");
    }

    return updated;
};


const deleteSEO = async (pagePath: string): Promise<ISEO> => {
    const existing = await SEO.findOne({ pagePath });

    if (!existing) {
        throw new AppError(httpStatus.NOT_FOUND, "No SEO info found for this page.");
    }

    const deleted = await SEO.findByIdAndDelete(existing._id);

    if (!deleted) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to delete SEO info.");
    }

    return deleted;
};

export const SEOServices = {
    getSEO,
    createSEO,
    updateSEO,
    deleteSEO
};

import httpStatus from 'http-status-codes';
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { sendEmail } from "../../utils/sendEmail";
import { ReferralFormSearchableFields } from "./referralForm.constant";
import { IReferralForm } from "./referralForm.interface";
import { ReferralForm } from "./referralForm.model";

const submitReferralForm = async (payload: IReferralForm) => {

    const result = await ReferralForm.create(payload);

    await sendEmail({
        to: result.yourEmail,
        subject: "Referral Form Submission",
        templateName: "referralForm",
        templateData: {
            name: result.yourName,
        }
    });

    return result;
};

const getAllReferralForm = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(ReferralForm.find(), query)

    const services = await queryBuilder
        .search(ReferralFormSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()

    const [data, meta] = await Promise.all([
        services.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};

const getSingleReferralForm = async (id: string) => {
    const result = await ReferralForm.findById(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Referral form not found");
    }

    return result;
};


const deleteReferralForm = async (id: string) => {
    const result = await ReferralForm.findByIdAndDelete(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Referral form not found");
    }

    return result;
};




export const ReferralFormServices = {
    submitReferralForm,
    getAllReferralForm,
    getSingleReferralForm,
    deleteReferralForm
};

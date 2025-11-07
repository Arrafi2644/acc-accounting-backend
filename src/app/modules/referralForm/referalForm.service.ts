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

export const ReferralFormServices = {
    submitReferralForm,
    getAllReferralForm
};

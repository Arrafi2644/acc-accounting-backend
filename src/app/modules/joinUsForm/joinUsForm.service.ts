import httpStatus from 'http-status-codes';
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { sendEmail } from "../../utils/sendEmail";
import { IJoinUsForm } from "./joinUsForm.interface";
import { JoinUsForm } from "./joinUsForm.model";
import { QueryBuilder } from '../../utils/queryBuilder';
import { JoinUsFormSearchableFields } from './constants';

const submitJoinUsForm = async (payload: IJoinUsForm) => {

    // const existingServiceType = await JoinUsForm.findOne({ email: payload.email });

    // if (existingServiceType) {
    //     throw new Error("User already submitted this form.");
    // }
    const result = await JoinUsForm.create(payload);

    sendEmail({
        to: result.email,
        subject: "Form Submission",
        templateName: "joinUsForm",
        templateData: {
            name: result.companyName
        }
    })

      // Send notification to company/admin
      await sendEmail({
        to: envVars.COMPANY_EMAIL,
        subject: "New “Join Us” Form Submission",
        templateName: "joinUsFormAdmin",
        templateData: {
          name: result.companyName,
          email: result.email
        },
      });
    return result;
};

const getSingleJoinUsForm = async (id: string) => {
    const result = await JoinUsForm.findById(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Form not found");
    }

    return result;
};

const getAllSubmittedFormData = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(JoinUsForm.find(), query);

    const messages = await queryBuilder
        .search(JoinUsFormSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        messages.build(),
        queryBuilder.getMeta()
    ]);

    return {
        data,
        meta
    };
};

const deleteJoinUsForm = async (id: string) => {
    const result = await JoinUsForm.findByIdAndDelete(id);

    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, "Form not found");
    }

    return result;
};
export const JoinUsFormServices = {
    submitJoinUsForm,
    getSingleJoinUsForm,
    getAllSubmittedFormData,
    deleteJoinUsForm
}
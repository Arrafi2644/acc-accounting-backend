import httpStatus from "http-status-codes";
import { Newsletter } from "./newsletter.model";
import { INewsletter } from "./newsletter.interface";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/queryBuilder";
import { NewsletterSearchableFields } from "./newsletter.constants";
import { sendEmail } from "../../utils/sendEmail";
import { envVars } from "../../config/env";

const createNewsletter = async (payload: INewsletter) => {
    const existingEmail = await Newsletter.findOne({
        email: payload.email,
    });

    if (existingEmail) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "This email is already subscribed to the newsletter"
        );
    }

    const newsletter = await Newsletter.create(payload);

    await Promise.all([
        sendEmail({
            to: newsletter.email,
            subject: "Newsletter Subscription Confirmed",
            templateName: "newsletterSubscription",
            templateData: {
                email: newsletter.email,
            },
        }),

        sendEmail({
            to: envVars.COMPANY_EMAIL,
            subject: "New Newsletter Subscription",
            templateName: "newsletterSubscriptionAdmin",
            templateData: {
                email: newsletter.email,
            },
        }),
    ]);
    return newsletter;
};

// const getAllNewsletters = async (query: Record<string, string>) => {
//   const queryBuilder = new QueryBuilder(Newsletter.find(), query);

//   const newsletters = await queryBuilder
//     .sort()
//     .fields()
//     .paginate();

//   const [data, meta] = await Promise.all([
//     newsletters.build(),
//     queryBuilder.getMeta(),
//   ]);

//   return { data, meta };
// };
// const getAllNewsletters = async (query: Record<string, string>) => {
//   const queryBuilder = new QueryBuilder(Newsletter.find(), query);

//   const newsletters = await queryBuilder
//     .search(NewsletterSearchableFields) 
//     .sort()
//     .fields()
//     .paginate();

//   const [data, meta] = await Promise.all([
//     newsletters.build(),
//     queryBuilder.getMeta(),
//   ]);

//   return { data, meta };
// };


const getAllNewsletters = async (query: Record<string, string>) => {
    const queryBuilder = new QueryBuilder(Newsletter.find(), query);

    const newsletters = await queryBuilder
        .search(NewsletterSearchableFields)
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        newsletters.build(),
        queryBuilder.getMeta(),
    ]);

    return { data, meta };
};

const deleteNewsletter = async (id: string) => {
    const newsletter = await Newsletter.findById(id);

    if (!newsletter) {
        throw new AppError(httpStatus.NOT_FOUND, "Newsletter email not found");
    }

    const deleted = await Newsletter.findByIdAndDelete(id);

    if (!deleted) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to delete newsletter email"
        );
    }

    return deleted;
};

export const NewsletterServices = {
    createNewsletter,
    getAllNewsletters,
    deleteNewsletter,
};

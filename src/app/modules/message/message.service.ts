import { envVars } from "../../config/env";
import { QueryBuilder } from "../../utils/queryBuilder";
import { sendEmail } from "../../utils/sendEmail";
import { MessageFormSearchableFields } from "./message.constants";
import { IMessageForm } from "./message.interface";
import { MessageForm } from "./message.model";

const submitMessageForm = async (payload: IMessageForm) => {
  const result = await MessageForm.create(payload);

  // Send confirmation to customer
  await sendEmail({
    to: result.email,
    subject: "Message Received Confirmation",
    templateName: "messageConfirmationForm",
    templateData: {
      name: result.fullName,
      subject: result.subject,
      message: result.message,
    },
  });

  // Send notification to company/admin
  await sendEmail({
    to: envVars.COMPANY_EMAIL,
    subject: "New Message Received from Website",
    templateName: "messageFormAdmin",
    templateData: {
      name: result.fullName,
      email: result.email,
      phone: result.phone,
      subject: result.subject,
      message: result.message,
    },
  });

  return result;
};

const getAllMessageForm = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(MessageForm.find(), query);

    const messages = await queryBuilder
        .search(MessageFormSearchableFields)
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

export const MessageFormServices = {
    submitMessageForm,
    getAllMessageForm
};

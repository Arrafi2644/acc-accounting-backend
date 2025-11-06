import { sendEmail } from "../../utils/sendEmail";
import { IJoinUsForm } from "./joinUsForm.interface";
import { JoinUsForm } from "./joinUsForm.model";

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
    return result;
};

const getAllSubmittedFormData = async () => {
    const result = await JoinUsForm.find();
    return {
        data: result
    }
};
export const JoinUsFormServices = {
    submitJoinUsForm,
    getAllSubmittedFormData
}
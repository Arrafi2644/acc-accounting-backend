import { IJoinUsForm } from "./joinUsForm.interface";
import { JoinUsForm } from "./joinUsForm.model";

const submitJoinUsForm = async (payload: IJoinUsForm) => {

    // const existingServiceType = await JoinUsForm.findOne({ email: payload.email });

    // if (existingServiceType) {
//     throw new Error("User already submitted this form.");
    // }

    return await JoinUsForm.create(payload);
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
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinUsFormServices = void 0;
const sendEmail_1 = require("../../utils/sendEmail");
const joinUsForm_model_1 = require("./joinUsForm.model");
const submitJoinUsForm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const existingServiceType = await JoinUsForm.findOne({ email: payload.email });
    // if (existingServiceType) {
    //     throw new Error("User already submitted this form.");
    // }
    const result = yield joinUsForm_model_1.JoinUsForm.create(payload);
    (0, sendEmail_1.sendEmail)({
        to: result.email,
        subject: "Form Submission",
        templateName: "joinUsForm",
        templateData: {
            name: result.companyName
        }
    });
    return result;
});
const getAllSubmittedFormData = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield joinUsForm_model_1.JoinUsForm.find();
    return {
        data: result
    };
});
exports.JoinUsFormServices = {
    submitJoinUsForm,
    getAllSubmittedFormData
};

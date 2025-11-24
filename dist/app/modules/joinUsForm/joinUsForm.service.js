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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinUsFormServices = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
const sendEmail_1 = require("../../utils/sendEmail");
const joinUsForm_model_1 = require("./joinUsForm.model");
const queryBuilder_1 = require("../../utils/queryBuilder");
const constants_1 = require("./constants");
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
    // Send notification to company/admin
    yield (0, sendEmail_1.sendEmail)({
        to: env_1.envVars.COMPANY_EMAIL,
        subject: "New “Join Us” Form Submission",
        templateName: "joinUsFormAdmin",
        templateData: {
            name: result.companyName,
            email: result.email
        },
    });
    return result;
});
const getSingleJoinUsForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield joinUsForm_model_1.JoinUsForm.findById(id);
    if (!result) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Form not found");
    }
    return result;
});
const getAllSubmittedFormData = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(joinUsForm_model_1.JoinUsForm.find(), query);
    const messages = yield queryBuilder
        .search(constants_1.JoinUsFormSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        messages.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
const deleteJoinUsForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield joinUsForm_model_1.JoinUsForm.findByIdAndDelete(id);
    if (!result) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Form not found");
    }
    return result;
});
exports.JoinUsFormServices = {
    submitJoinUsForm,
    getSingleJoinUsForm,
    getAllSubmittedFormData,
    deleteJoinUsForm
};

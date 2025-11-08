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
exports.MessageFormServices = void 0;
const env_1 = require("../../config/env");
const queryBuilder_1 = require("../../utils/queryBuilder");
const sendEmail_1 = require("../../utils/sendEmail");
const message_constants_1 = require("./message.constants");
const message_model_1 = require("./message.model");
const submitMessageForm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_model_1.MessageForm.create(payload);
    // Send confirmation to customer
    yield (0, sendEmail_1.sendEmail)({
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
    yield (0, sendEmail_1.sendEmail)({
        to: env_1.envVars.COMPANY_EMAIL,
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
});
const getAllMessageForm = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(message_model_1.MessageForm.find(), query);
    const messages = yield queryBuilder
        .search(message_constants_1.MessageFormSearchableFields)
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
exports.MessageFormServices = {
    submitMessageForm,
    getAllMessageForm
};

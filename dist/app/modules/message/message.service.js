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
exports.MessageFormServices = exports.deleteMessage = exports.getSingleMessage = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const env_1 = require("../../config/env");
const appError_1 = __importDefault(require("../../errorHelpers/appError"));
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
// Get single message by ID
const getSingleMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_model_1.MessageForm.findById(id);
    if (!result) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Message not found");
    }
    return result;
});
exports.getSingleMessage = getSingleMessage;
// Delete message by ID
const deleteMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield message_model_1.MessageForm.findByIdAndDelete(id);
    if (!result) {
        throw new appError_1.default(http_status_codes_1.default.NOT_FOUND, "Message not found");
    }
    return result;
});
exports.deleteMessage = deleteMessage;
exports.MessageFormServices = {
    submitMessageForm,
    getAllMessageForm,
    deleteMessage: exports.deleteMessage,
    getSingleMessage: exports.getSingleMessage
};

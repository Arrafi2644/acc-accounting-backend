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
exports.ReferralFormServices = void 0;
const queryBuilder_1 = require("../../utils/queryBuilder");
const sendEmail_1 = require("../../utils/sendEmail");
const referralForm_constant_1 = require("./referralForm.constant");
const referralForm_model_1 = require("./referralForm.model");
const submitReferralForm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield referralForm_model_1.ReferralForm.create(payload);
    yield (0, sendEmail_1.sendEmail)({
        to: result.yourEmail,
        subject: "Referral Form Submission",
        templateName: "referralForm",
        templateData: {
            name: result.yourName,
        }
    });
    return result;
});
const getAllReferralForm = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(referralForm_model_1.ReferralForm.find(), query);
    const services = yield queryBuilder
        .search(referralForm_constant_1.ReferralFormSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        services.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
});
exports.ReferralFormServices = {
    submitReferralForm,
    getAllReferralForm
};

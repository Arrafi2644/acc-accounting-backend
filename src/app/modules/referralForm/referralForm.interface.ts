export interface IReferralForm extends Document {
    referralName: string;
    yourName: string;
    referralEmail: string;
    yourEmail: string;
    referralPhone: string;
    helpDescription: string;
    referralAddress: string;
    referralSuburb?: string;
    isHuman: boolean;
}
export interface IJoinUsForm {
  companyName: string;
  companyDate: string; // ISO format: YYYY-MM-DD
  companyIRD: number;

  director1: {
    name: string;
    position: string;
    date: string;
    ird: string;
  };

  director2: {
    name: string;
    position: string;
    date: string;
    ird: string;
  };

  address: string;
  phoneBusiness: string;
  phoneHome: string;
  phoneMobile: string;
  email: string;

  isHuman: boolean; // for reCAPTCHA or checkbox
}

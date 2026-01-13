
export interface IBanner {
    title: string;
    subtitle: string;
}
export interface IServiceOverview {
    title: string;
    description: string;
    features?: string[];
    serviceImage: string;
}

export interface IFeature {
    title: string;
    description: string;
    icon: string;
}

export interface IServiceMatter {
    matterSectionTitle: string;
    matterSectionSubTitle: string;
    withoutSaaS: {
        badgeTitle: string,
        badgeIcon: string,
        title: string,
        items: {
            icon: string;
            text: string;
        }[]
    };
       withSaaS: {
        badgeTitle: string,
        badgeIcon: string,
        title: string,
        items: {
            icon: string;
            text: string;
        }[]
    };
}

export interface IProcessStep {
    stepNumber: number;
    title: string;
    description: string;
    icon: string;
}

export interface IRequirementDoc {
    title: string;
    icon: string;
}

export interface IFaq {
    question: string;
    answer: string;
}

export interface IService {
    _id?: string;
    title: string;
    slug?: string;
    serviceSummary: string;
    shortDescription: string;
    serviceIcon: string;
    banner: IBanner;
    overView: IServiceOverview;
    serviceMatter: IServiceMatter;
    features: IFeature[];
    processSteps: IProcessStep[];
    requirementDocs: IRequirementDoc[];
    faqs: IFaq[];
    createdAt?: string;
    updatedAt?: string;
}
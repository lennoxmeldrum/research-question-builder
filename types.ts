
export enum Step {
  Welcome,
  Topic,
  Feasibility,
  Methodology,
  Draft,
  Refine,
  Final,
}

export enum PrimaryMethod {
  None = 'none',
  Experiment = 'experiment',
  Survey = 'survey',
  Interview = 'interview',
  MetaAnalysis = 'meta-analysis',
}

export interface FinerCriteria {
  feasible: string;
  interesting: string;
  novel: string;
  ethical: string;
  relevant: string;
}

export interface FormData {
  topicOverview: string;
  backgroundResearch: string;
  researchGap: string;
  resources: string[];
  primaryMethod: PrimaryMethod;
  methodDetails: string;
  ethicalConsiderations: string[];
  draftQuestion: string;
  refinedQuestion: string;
  finer: FinerCriteria;
}

export const initialFormData: FormData = {
  topicOverview: '',
  backgroundResearch: '',
  researchGap: '',
  resources: [],
  primaryMethod: PrimaryMethod.None,
  methodDetails: '',
  ethicalConsiderations: [],
  draftQuestion: '',
  refinedQuestion: '',
  finer: {
    feasible: '',
    interesting: '',
    novel: '',
    ethical: '',
    relevant: '',
  },
};

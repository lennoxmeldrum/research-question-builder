
import { Step } from './types';

export const TOTAL_STEPS = Object.keys(Step).length / 2;

export const STEP_NAMES: string[] = [
    "Topic Exploration",
    "Feasibility Check",
    "Methodology & Ethics",
    "Draft Question",
    "Refine with FINER",
    "Final Question"
];

export const RESOURCE_OPTIONS = [
  { id: 'lab', label: 'School Lab Access' },
  { id: 'equipment', label: 'Specialized Equipment' },
  { id: 'software', label: 'Specific Software (e.g., for stats)' },
  { id: 'budget', label: 'A small budget for materials' },
  { id: 'library', label: 'Access to academic databases/journals' },
];

export const ETHICS_OPTIONS = [
  { id: 'human', label: 'Involves human participants (surveys, interviews, observations)' },
  { id: 'animal', label: 'Involves animals' },
  { id: 'data', label: 'Handles sensitive or private data' },
  { id: 'environment', label: 'Involves environmental manipulation' },
];

export const FINER_QUESTIONS = {
    feasible: {
        prompt: "Feasible: Can you realistically complete this project within your 15-20 week timeframe and with the resources you have?",
        placeholder: "e.g., 'Yes, the survey is online and I can reach enough people.' or 'No, the experiment requires a C. elegans lab I don't have access to.'"
    },
    interesting: {
        prompt: "Interesting: Are you genuinely curious about the outcome? Will it keep you motivated for the whole course?",
        placeholder: "e.g., 'Yes, I've always been fascinated by how memory works in different species.'"
    },
    novel: {
        prompt: "Novel: Does it add something new, even if small, to the existing body of knowledge? Does it confirm, refute, or extend previous findings?",
        placeholder: "e.g., 'It's novel in that it applies a known model to a local community context not previously studied.'"
    },
    ethical: {
        prompt: "Ethical: Is your research approach ethically sound? Have you considered consent, privacy, and potential harm?",
        placeholder: "e.g., 'Yes, all survey participants will be anonymous and will provide informed consent.'"
    },
    relevant: {
        prompt: "Relevant: Why does this research matter? Who might be interested in the findings (outside of your teacher)?",
        placeholder: "e.g., 'It could be relevant to local conservation efforts or help students understand study habits better.'"
    }
};

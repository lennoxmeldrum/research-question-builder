import { GoogleGenAI } from "@google/genai";
import { Step, FormData } from '../types';

// This is a placeholder for a real API key, which should be stored securely
// and not hardcoded in the source file. The environment variable is assumed
// to be available in the execution context.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.warn("API_KEY environment variable not set. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: apiKey! });

function getPromptForStep(step: Step, data: FormData): string {
    switch (step) {
        case Step.Topic:
            return `You are an AI assistant for a Grade 12 student building a research question for a 15-20 week project. Based on the following information, provide a brief, encouraging summary and suggest one or two potential research questions that seem feasible for a high school context. Keep the tone helpful and mentor-like. Format your response using Markdown, including headings for sections like "Summary" and "Suggested Questions".
            
Topic: ${data.topicOverview}
Background: ${data.backgroundResearch}
Identified Gap: ${data.researchGap}`;
        
        case Step.Feasibility:
             return `The student has provided their topic and is now considering feasibility. Based on their available resources, analyze the feasibility and provide constructive feedback. Remind them to keep the 15-20 week timeline in mind. Is their plan realistic? Suggest potential pivots if it seems too ambitious. Format your response using Markdown, with headings for "Feasibility Analysis" and "Suggestions".
            
Topic Info:
- Topic: ${data.topicOverview}
- Background: ${data.backgroundResearch}
- Gap: ${data.researchGap}
            
Available Resources: ${data.resources.length > 0 ? data.resources.join(', ') : 'None specified'}`;

        case Step.Methodology:
            return `The student has chosen a primary research method. Review their plan and offer feedback. Does the method fit the topic? Are there any obvious flaws or things they should consider? If they mentioned ethical concerns, briefly acknowledge their importance. Format your response using Markdown, using headings for "Methodology Review" and "Key Considerations".
            
Topic Info:
- Topic: ${data.topicOverview}
- Gap: ${data.researchGap}

Methodology:
- Primary Method: ${data.primaryMethod}
- Plan: ${data.methodDetails}
- Potential Ethical Issues: ${data.ethicalConsiderations.length > 0 ? data.ethicalConsiderations.join(', ') : 'None specified'}`;
            
        case Step.Draft:
             return `The student has drafted their first research question. Analyze it based on the information provided so far. Is it clear? Is it focused? Does it seem answerable with their proposed method and resources? Provide constructive feedback to help them refine it using the FINER (Feasible, Interesting, Novel, Ethical, Relevant) criteria in the next step. Format your response using Markdown, with headings like "Draft Question Analysis" and "Suggestions for Refinement".
             
Previous Info:
- Topic: ${data.topicOverview}
- Method: ${data.primaryMethod}
- Resources: ${data.resources.join(', ')}

Draft Question: "${data.draftQuestion}"`;

        default:
            return '';
    }
}

export async function getAiSuggestionForStep(step: Step, data: FormData): Promise<string> {
    const prompt = getPromptForStep(step, data);
    if (!prompt || !apiKey) {
        return '';
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching AI suggestion:", error);
        return "Sorry, I couldn't fetch a suggestion right now. Please check your connection or API key and try again.";
    }
}
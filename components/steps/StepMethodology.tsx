import React from 'react';
import { FormData, PrimaryMethod } from '../../types';
import { ETHICS_OPTIONS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FormLabel, HelperText, TextArea, Checkbox } from '../ui/FormElements';
import AiSuggestion from '../ui/AiSuggestion';

interface StepMethodologyProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  aiSuggestion?: string;
}

const StepMethodology: React.FC<StepMethodologyProps> = ({ data, updateData, onNext, onBack, aiSuggestion }) => {
  const methodOptions = [
    { value: PrimaryMethod.Experiment, label: "Experiment", description: "You will manipulate variables to observe an effect (e.g., testing chickens in a maze)." },
    { value: PrimaryMethod.Survey, label: "Survey/Questionnaire", description: "You will collect data from a group of people using a standard set of questions." },
    { value: PrimaryMethod.Interview, label: "Interviews", description: "You will conduct in-depth conversations with individuals to gather qualitative data." },
    { value: PrimaryMethod.MetaAnalysis, label: "Meta-Analysis / Literature Review", description: "You will synthesize and analyze data from existing published studies (like the student examples)." },
  ];

  const handleEthicsChange = (ethicId: string) => {
    const newEthics = data.ethicalConsiderations.includes(ethicId)
      ? data.ethicalConsiderations.filter(e => e !== ethicId)
      : [...data.ethicalConsiderations, ethicId];
    updateData({ ethicalConsiderations: newEthics });
  };
  
  const canProceed = data.primaryMethod !== PrimaryMethod.None && data.methodDetails;

  return (
    <Card>
      <AiSuggestion suggestion={aiSuggestion} />
      <div className="space-y-8">
        <div>
          <FormLabel>1. What is your primary research method?</FormLabel>
          <HelperText>How will you gather your primary data? Choose the one that best fits your project.</HelperText>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methodOptions.map(opt => (
              <button 
                key={opt.value}
                onClick={() => updateData({ primaryMethod: opt.value })}
                className={`p-4 border rounded-lg text-left transition-all duration-200 ${data.primaryMethod === opt.value ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500' : 'bg-white border-slate-300 hover:border-indigo-400'}`}
              >
                <p className="font-bold text-indigo-700">{opt.label}</p>
                <p className="text-sm text-slate-600">{opt.description}</p>
              </button>
            ))}
          </div>
        </div>
        
        {data.primaryMethod !== PrimaryMethod.None && (
          <div>
            <FormLabel htmlFor="methodDetails">2. Briefly describe your plan</FormLabel>
            <HelperText>Explain your procedure. If it's an experiment, what are your variables (independent, dependent, controlled)? If a survey, who is your target audience?</HelperText>
            <TextArea
              id="methodDetails"
              value={data.methodDetails}
              onChange={(e) => updateData({ methodDetails: e.target.value })}
              placeholder="e.g., I will build a simple maze and time how long it takes for two chickens to complete it over three sessions..."
            />
          </div>
        )}

        <div>
          <FormLabel>3. Ethical Considerations</FormLabel>
          <HelperText>Good science is ethical science. Does your research involve any of the following? If so, you MUST discuss your plan for ethical conduct with your teacher.</HelperText>
          <div className="space-y-3">
             {ETHICS_OPTIONS.map(option => (
                <Checkbox 
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    checked={data.ethicalConsiderations.includes(option.id)}
                    onChange={() => handleEthicsChange(option.id)}
                />
             ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-between">
        <Button onClick={onBack} variant="secondary">Back</Button>
        <Button onClick={onNext} disabled={!canProceed}>Next: Draft Question</Button>
      </div>
    </Card>
  );
};

export default StepMethodology;
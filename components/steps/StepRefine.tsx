import React from 'react';
import { FormData, FinerCriteria } from '../../types';
import { FINER_QUESTIONS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FormLabel, HelperText, TextArea } from '../ui/FormElements';
import AiSuggestion from '../ui/AiSuggestion';

interface StepRefineProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  aiSuggestion?: string;
}

const StepRefine: React.FC<StepRefineProps> = ({ data, updateData, onNext, onBack, aiSuggestion }) => {
  const handleFinerChange = (key: keyof FinerCriteria, value: string) => {
    updateData({ finer: { ...data.finer, [key]: value } });
  };
    
  return (
    <Card>
      <AiSuggestion suggestion={aiSuggestion} />
      <div className="space-y-8">
        <div>
          <FormLabel>Your Draft Question</FormLabel>
          <div className="p-4 bg-slate-100 rounded-lg text-slate-800 font-medium">
            "{data.draftQuestion}"
          </div>
        </div>

        <div>
            <FormLabel>Refine using the FINER criteria</FormLabel>
            <HelperText>A strong research question is Feasible, Interesting, Novel, Ethical, and Relevant. Let's check yours against each point.</HelperText>
            <div className="space-y-6">
                {(Object.keys(FINER_QUESTIONS) as Array<keyof FinerCriteria>).map(key => (
                    <div key={key}>
                        <label className="block text-base font-semibold text-slate-700">{FINER_QUESTIONS[key].prompt}</label>
                        <TextArea 
                            value={data.finer[key]}
                            onChange={(e) => handleFinerChange(key, e.target.value)}
                            placeholder={FINER_QUESTIONS[key].placeholder}
                            rows={2}
                            className="mt-1"
                        />
                    </div>
                ))}
            </div>
        </div>

         <div>
          <FormLabel htmlFor="refinedQuestion">Your Refined Question</FormLabel>
          <HelperText>After considering the FINER criteria, make any final adjustments to your question here. This will be your final version.</HelperText>
          <TextArea
            id="refinedQuestion"
            value={data.refinedQuestion}
            onChange={(e) => updateData({ refinedQuestion: e.target.value })}
            rows={4}
          />
        </div>

      </div>
      <div className="mt-10 flex justify-between">
        <Button onClick={onBack} variant="secondary">Back</Button>
        <Button onClick={onNext} disabled={!data.refinedQuestion}>Finish</Button>
      </div>
    </Card>
  );
};

export default StepRefine;
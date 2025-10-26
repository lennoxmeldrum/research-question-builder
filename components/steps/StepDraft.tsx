import React from 'react';
import { FormData } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FormLabel, HelperText, TextArea } from '../ui/FormElements';
import AiSuggestion from '../ui/AiSuggestion';

interface StepDraftProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  aiSuggestion?: string;
}

const StepDraft: React.FC<StepDraftProps> = ({ data, updateData, onNext, onBack, aiSuggestion }) => {
  return (
    <Card>
      <AiSuggestion suggestion={aiSuggestion} />
      <div>
        <FormLabel htmlFor="draftQuestion">Let's draft your research question!</FormLabel>
        <HelperText>Based on everything you've considered, try to write a single, clear question. Don't worry about perfection; we'll refine it in the next step.</HelperText>
        <div className="bg-sky-100 border-l-4 border-sky-500 text-sky-800 p-4 rounded-md mb-4">
            <p className="font-bold">Good Question Templates:</p>
            <ul className="list-disc list-inside mt-2 text-sm">
                <li>To what extent does [Independent Variable] affect [Dependent Variable] in [Population/Context]?</li>
                <li>What is the relationship between [Variable A] and [Variable B] among [Population]?</li>
                <li>How do [Group 1] and [Group 2] compare in terms of [Measurement]?</li>
            </ul>
        </div>
        <TextArea
          id="draftQuestion"
          value={data.draftQuestion}
          onChange={(e) => updateData({ draftQuestion: e.target.value, refinedQuestion: e.target.value })}
          placeholder="To what extent do the early stages of brain maturation and cognitive development in a two-week-old Gallus gallus domesticus and Homo sapiens infant (6 to 24 months old) exhibit similarities within the context of short-term and long-term memory processing?"
          rows={6}
        />
      </div>
      <div className="mt-10 flex justify-between">
        <Button onClick={onBack} variant="secondary">Back</Button>
        <Button onClick={onNext} disabled={!data.draftQuestion}>Next: Refine</Button>
      </div>
    </Card>
  );
};

export default StepDraft;
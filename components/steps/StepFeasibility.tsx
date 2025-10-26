import React from 'react';
import { FormData } from '../../types';
import { RESOURCE_OPTIONS } from '../../constants';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Checkbox, FormLabel, HelperText } from '../ui/FormElements';
import AiSuggestion from '../ui/AiSuggestion';

interface StepFeasibilityProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  aiSuggestion?: string;
}

const StepFeasibility: React.FC<StepFeasibilityProps> = ({ data, updateData, onNext, onBack, aiSuggestion }) => {
  
  const handleResourceChange = (resourceId: string) => {
    const newResources = data.resources.includes(resourceId)
      ? data.resources.filter(r => r !== resourceId)
      : [...data.resources, resourceId];
    updateData({ resources: newResources });
  };

  return (
    <Card>
      <AiSuggestion suggestion={aiSuggestion} />
      <div className="space-y-8">
        <div>
            <FormLabel>1. Your Timeline</FormLabel>
            <HelperText>Remember, you have about 15-20 weeks for this entire project, from research to final paper. This is a key constraint to keep in mind!</HelperText>
            <div className="bg-sky-100 border-l-4 border-sky-500 text-sky-800 p-4 rounded-md">
                <p className="font-bold">High School Context Check</p>
                <p>A shorter, well-executed project is much better than an ambitious one that you can't complete. Let's make sure your idea fits the timeframe.</p>
            </div>
        </div>
        <div>
          <FormLabel>2. What resources are available to you?</FormLabel>
          <HelperText>Be realistic. Your school's resources will define what kind of project is possible. Check all that apply.</HelperText>
          <div className="space-y-3">
             {RESOURCE_OPTIONS.map(option => (
                <Checkbox 
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    checked={data.resources.includes(option.id)}
                    onChange={() => handleResourceChange(option.id)}
                />
             ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-between">
        <Button onClick={onBack} variant="secondary">Back</Button>
        <Button onClick={onNext}>Next: Methodology</Button>
      </div>
    </Card>
  );
};

export default StepFeasibility;
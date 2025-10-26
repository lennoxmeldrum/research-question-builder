
import React from 'react';
import { FormData } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { FormLabel, HelperText, TextArea } from '../ui/FormElements';

interface StepTopicProps {
  data: FormData;
  updateData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTopic: React.FC<StepTopicProps> = ({ data, updateData, onNext, onBack }) => {
  const canProceed = data.topicOverview && data.backgroundResearch && data.researchGap;
    
  return (
    <Card>
      <div className="space-y-8">
        <div>
          <FormLabel htmlFor="topicOverview">1. What is your broad research topic?</FormLabel>
          <HelperText>Start with a general idea. For example, "memory in animals," "lead in cosmetics," or "teen sleep patterns."</HelperText>
          <TextArea
            id="topicOverview"
            value={data.topicOverview}
            onChange={(e) => updateData({ topicOverview: e.target.value })}
            placeholder="Describe the general area you're interested in..."
          />
        </div>
        <div>
          <FormLabel htmlFor="backgroundResearch">2. What do you already know?</FormLabel>
          <HelperText>Briefly summarize any initial reading or background knowledge you have. What are the key concepts? Mention any reliable sources you've found (e.g., scientific journals, textbooks).</HelperText>
          <TextArea
            id="backgroundResearch"
            value={data.backgroundResearch}
            onChange={(e) => updateData({ backgroundResearch: e.target.value })}
            placeholder="I've read that the hippocampus is related to spatial memory in both birds and mammals..."
          />
        </div>
        <div>
          <FormLabel htmlFor="researchGap">3. What is the problem or gap in knowledge?</FormLabel>
          <HelperText>Based on what you know, what seems to be unknown, controversial, or not fully understood? What question are you trying to answer?</HelperText>
          <TextArea
            id="researchGap"
            value={data.researchGap}
            onChange={(e) => updateData({ researchGap: e.target.value })}
            placeholder="Most studies compare mice or primates to humans, but I wonder if simpler animals like chickens show similar memory development..."
          />
        </div>
      </div>
      <div className="mt-10 flex justify-between">
        <Button onClick={onBack} variant="secondary">Back</Button>
        <Button onClick={onNext} disabled={!canProceed}>Next: Feasibility</Button>
      </div>
    </Card>
  );
};

export default StepTopic;

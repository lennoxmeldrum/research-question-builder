
import React from 'react';
import { FormData } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StepFinalProps {
  data: FormData;
  onRestart: () => void;
}

const SummaryItem: React.FC<{label: string; value: React.ReactNode}> = ({label, value}) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-base font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 text-base text-slate-900 sm:mt-0 sm:col-span-2">{value}</dd>
    </div>
);

const StepFinal: React.FC<StepFinalProps> = ({ data, onRestart }) => {
  return (
    <Card className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Congratulations!</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
        You've successfully developed a focused research question. Here is a summary of your plan.
      </p>

      <div className="bg-indigo-50 border-2 border-dashed border-indigo-200 rounded-xl p-6 my-8 text-left">
          <h3 className="text-center text-xl font-bold text-indigo-800 mb-2">Your Final Research Question:</h3>
          <p className="text-center text-2xl font-semibold text-slate-800 mb-6">"{data.refinedQuestion}"</p>
          <hr className="my-6 border-indigo-200" />
          <dl className="divide-y divide-slate-200">
              <SummaryItem label="Topic Overview" value={data.topicOverview} />
              <SummaryItem label="Research Method" value={<span className="capitalize">{data.primaryMethod}</span>} />
              <SummaryItem label="Method Details" value={data.methodDetails} />
              <SummaryItem label="Resources Required" value={data.resources.length > 0 ? data.resources.join(', ') : 'None specified'} />
              <SummaryItem label="Ethical Considerations" value={data.ethicalConsiderations.length > 0 ? data.ethicalConsiderations.join(', ') : 'None specified'} />
          </dl>
      </div>
      
      <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-800 p-4 rounded-md text-left max-w-2xl mx-auto">
          <p className="font-bold">Important Next Steps:</p>
          <ul className="list-disc list-inside mt-2">
              <li><strong>Share this with your teacher!</strong> Get their feedback before you begin your research.</li>
              <li>Start developing your detailed methodology and procedure.</li>
              <li>Begin your formal literature review to build your introduction and background.</li>
          </ul>
      </div>

      <Button onClick={onRestart} className="mt-10 text-lg px-8 py-3" variant="secondary">
        Start a New Question
      </Button>
    </Card>
  );
};

export default StepFinal;

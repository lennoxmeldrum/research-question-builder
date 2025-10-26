import React, { useState, useCallback } from 'react';
import { Step, FormData, initialFormData } from './types';
import Stepper from './components/Stepper';
import StepWelcome from './components/steps/StepWelcome';
import StepTopic from './components/steps/StepTopic';
import StepFeasibility from './components/steps/StepFeasibility';
import StepMethodology from './components/steps/StepMethodology';
import StepDraft from './components/steps/StepDraft';
import StepRefine from './components/steps/StepRefine';
import StepFinal from './components/steps/StepFinal';
import { TOTAL_STEPS } from './constants';
import { getAiSuggestionForStep } from './lib/gemini';
import Spinner from './components/ui/Spinner';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.Welcome);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [aiSuggestions, setAiSuggestions] = useState<Partial<Record<Step, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = useCallback((data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  }, []);

  const handleNext = async () => {
    const stepsWithAIFeedback = [Step.Topic, Step.Feasibility, Step.Methodology, Step.Draft];
    const nextStepEnum = currentStep + 1;

    if (stepsWithAIFeedback.includes(currentStep)) {
      setIsLoading(true);
      try {
        const suggestion = await getAiSuggestionForStep(currentStep, formData);
        setAiSuggestions(prev => ({ ...prev, [nextStepEnum]: suggestion }));
      } finally {
        setIsLoading(false);
      }
    }
    
    setCurrentStep(prev => Math.min(prev + 1, Step.Final));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleRestart = () => {
    setFormData(initialFormData);
    setAiSuggestions({});
    setCurrentStep(Step.Welcome);
  };

  const renderStep = () => {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-xl shadow-lg min-h-[300px]">
                <Spinner />
                <p className="text-lg text-slate-600 mt-4">Your AI mentor is thinking...</p>
                <p className="text-sm text-slate-500">This might take a moment.</p>
            </div>
        );
    }

    switch (currentStep) {
      case Step.Welcome:
        return <StepWelcome onNext={handleNext} />;
      case Step.Topic:
        return <StepTopic data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} />;
      case Step.Feasibility:
        return <StepFeasibility data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} aiSuggestion={aiSuggestions[Step.Feasibility]} />;
      case Step.Methodology:
        return <StepMethodology data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} aiSuggestion={aiSuggestions[Step.Methodology]} />;
      case Step.Draft:
        return <StepDraft data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} aiSuggestion={aiSuggestions[Step.Draft]} />;
      case Step.Refine:
        return <StepRefine data={formData} updateData={updateFormData} onNext={handleNext} onBack={handleBack} aiSuggestion={aiSuggestions[Step.Refine]} />;
      case Step.Final:
        return <StepFinal data={formData} onRestart={handleRestart} />;
      default:
        return <StepWelcome onNext={handleNext} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 flex flex-col items-center justify-start p-4 sm:p-6 md:p-8 bg-gradient-to-br from-sky-50 to-indigo-100">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight">Research Question Builder</h1>
          <p className="text-lg text-slate-600 mt-2">Your friendly guide for your Grade 12 research project!</p>
        </header>
        
        {currentStep > Step.Welcome && currentStep < Step.Final && (
          <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS-1} />
        )}
        
        <main className="mt-8">
            {renderStep()}
        </main>
      </div>
    </div>
  );
};

export default App;
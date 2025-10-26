
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface StepWelcomeProps {
  onNext: () => void;
}

const StepWelcome: React.FC<StepWelcomeProps> = ({ onNext }) => {
  return (
    <Card className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">Welcome, Future Scientist!</h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
        Crafting a great research question is the most important step in your scientific journey. It's the compass that will guide your entire project.
      </p>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
        This tool will act as your personal mentor, asking you the right questions to help you transform a broad topic into a focused, feasible, and fascinating research question for your 15-20 week project.
      </p>
      <Button onClick={onNext} className="text-xl px-8 py-3">
        Let's Get Started!
      </Button>
    </Card>
  );
};

export default StepWelcome;

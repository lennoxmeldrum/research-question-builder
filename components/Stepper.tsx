
import React from 'react';
import { STEP_NAMES } from '../constants';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full px-4 sm:px-0">
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200" style={{ transform: 'translateY(-50%)' }}></div>
        <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-500 transition-all duration-500" 
            style={{ 
                width: `${(currentStep - 1) / (totalSteps - 1) * 100}%`,
                transform: 'translateY(-50%)'
            }}
        ></div>
        <div className="flex justify-between items-center relative">
          {STEP_NAMES.slice(0, totalSteps).map((name, index) => {
            const stepIndex = index + 1;
            const isActive = stepIndex <= currentStep;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300 ${isActive ? 'bg-indigo-500' : 'bg-slate-300'}`}
                >
                  {stepIndex}
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;

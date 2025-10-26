import React from 'react';

interface FormLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}
export const FormLabel: React.FC<FormLabelProps> = ({ children, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={`block text-lg font-semibold text-slate-700 mb-2 ${className}`}>
    {children}
  </label>
);

interface HelperTextProps {
    children: React.ReactNode;
    className?: string;
}
export const HelperText: React.FC<HelperTextProps> = ({ children, className }) => (
  <p className={`text-sm text-slate-500 mt-1 mb-3 ${className}`}>{children}</p>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const TextArea: React.FC<TextAreaProps> = ({ className, ...props }) => (
    <textarea
        rows={5}
        className={`w-full p-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ${className}`}
        {...props}
    />
);

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const Checkbox: React.FC<CheckboxProps> = ({ id, label, checked, onChange }) => (
    <div className="flex items-center">
        <input
            id={id}
            name={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor={id} className="ml-3 text-base text-slate-600">
            {label}
        </label>
    </div>
);
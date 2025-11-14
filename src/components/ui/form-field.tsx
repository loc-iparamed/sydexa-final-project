import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required = false, error, children }) => {
  return (
    <div>
      <label className='block text-sm font-medium text-slate-700 mb-2'>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>
      {children}
      {error && (
        <p className='text-red-500 text-sm mt-1 flex items-center gap-1'>
          <span className='inline-block w-4 h-4 text-xs'>⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;

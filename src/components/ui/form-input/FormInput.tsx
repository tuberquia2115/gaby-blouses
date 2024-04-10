import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors: FieldError | undefined;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, errors, id, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          ref={ref}
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-2', {
            'border-red-500': errors,
          })}
          {...props}
        />
      </div>
    );
  }
);

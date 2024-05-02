import clsx from 'clsx';
import React from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors: FieldError | undefined;
}

// react/display-name
const FormInput =  React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { label, errors, id, ...restProps } = props;
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        ref={ref}
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-2', {
          'border-red-500': errors,
        })}
        {...restProps}
      />
    </div>
  );
});

FormInput.displayName = "FormInput"

export {
  FormInput
}
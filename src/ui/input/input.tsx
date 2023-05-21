import { forwardRef } from 'react';
import { ChangeHandler } from 'react-hook-form';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'password';
  placeholder?: string;
  required?: boolean;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    { id, label, type, placeholder, required, onChange, onBlur, name, error },
    ref
  ) => {
    let inputClassName =
      'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
    if (error) {
      inputClassName =
        'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400';
    }

    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          id={id}
          className={inputClassName}
          placeholder={placeholder}
          required={required}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.defaultProps = {
  placeholder: undefined,
  required: false,
  error: undefined,
};

export default Input;

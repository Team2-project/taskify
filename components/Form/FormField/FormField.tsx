import React, { ReactNode, useState } from "react";
import { ReactSVG } from "react-svg";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFormValid?: boolean;
}

const Form = ({ children, onSubmit, isFormValid = true }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      {children}
    </form>
  );
};

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  showError?: boolean;
}

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  showError = false,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-base font-medium'>{label}</label>
      <div className='relative'>
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`h-50 w-full rounded-lg border bg-white px-4 py-2 focus:outline-none tablet:w-full ${
            showError && error
              ? "border-red"
              : "border-gray-30 focus:border-violet-20"
          }`}
        />
        {type === "password" && (
          <button
            type='button'
            onClick={handleTogglePassword}
            className={`absolute inset-y-0 right-0 flex items-center px-3 ${showError && error ? "mb-6" : ""}`}
          >
            <ReactSVG
              src={
                showPassword
                  ? "/icon/ic_visibility.svg"
                  : "/icon/ic_visibility_off.svg"
              }
            />
          </button>
        )}
        {showError && error && (
          <p className='mt-2 text-sm font-normal text-red'>{error}</p>
        )}
      </div>
    </div>
  );
};

interface FormButtonProps {
  children: ReactNode;
  isFormValid?: boolean;
  onClick?: () => void;
}

const FormButton = ({
  children,
  isFormValid = true,
  onClick,
}: FormButtonProps) => {
  return (
    <button
      type='submit'
      className={`h-50 w-351 rounded-lg ${
        isFormValid ? "bg-violet-20" : "bg-gray-40"
      } text-white tablet:w-520`}
      disabled={!isFormValid}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Form.Field = FormField;
Form.Button = FormButton;

export default Form;

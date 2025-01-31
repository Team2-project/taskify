import React, { ReactNode, useState } from "react";
import { ReactSVG } from "react-svg";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFormValid?: boolean;
  className?: string;
}

const Form = ({ children, onSubmit, className }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-3 ${className}`}>
      {children}
    </form>
  );
};

interface FormFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  showError?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  width?: string;
  tabletWidth?: string;
  desktopWidth?: string;
  className?: string;
}

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  showError = false,
  readOnly = false,
  disabled = false,
  width = "w-351",
  tabletWidth = "tablet:w-520",
  desktopWidth = "desktop:w-520",
  className = "",
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className='text-base font-medium'>{label}</label>
      <div className='relative'>
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          disabled={disabled}
          placeholder={placeholder}
          className={`h-50 ${width} ${tabletWidth} ${desktopWidth} rounded-lg border bg-white px-4 py-2 focus:outline-none ${
            showError && error
              ? "border-red"
              : "border-gray-30 focus:border-violet-20"
          }${readOnly || disabled ? "cursor-not-allowed bg-gray-30 text-gray-50" : ""} ${className}`}
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
  className?: string;
}

const FormButton = ({
  children,
  isFormValid = true,
  onClick,
  className = "",
}: FormButtonProps) => {
  return (
    <button
      type='submit'
      className={`h-50 w-351 rounded-lg ${
        isFormValid ? "bg-violet-20" : "bg-gray-40"
      } text-white tablet:w-520 ${className}`}
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

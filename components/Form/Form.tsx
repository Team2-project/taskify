import React, { ReactNode, useState } from "react";
import { ReactSVG } from "react-svg";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className='space-y-5'>
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
}

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
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
          className='w-351 h-50 tablet:w-520 rounded-lg border border-gray-30 px-4 py-2 focus:border-violet-20 focus:outline-none'
        />
        {type === "password" && (
          <button
            type='button'
            onClick={handleTogglePassword}
            className='text-gray-600 absolute inset-y-0 right-0 flex items-center px-3'
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
      </div>
    </div>
  );
};

interface FormButtonProps {
  children: ReactNode;
}

const FormButton = ({ children }: FormButtonProps) => {
  return (
    <button
      type='submit'
      className='w-351 h-50 tablet:w-520 rounded-lg bg-gray-40 text-white'
    >
      {children}
    </button>
  );
};

Form.Field = FormField;
Form.Button = FormButton;

export default Form;

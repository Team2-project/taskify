import React, { ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const DashBoardForm = ({ children, onSubmit }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className='space-y-[16px]'>
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
  return (
    <div className='flex flex-col gap-2.5'>
      <label className='text-base font-medium tablet:text-lg'>{label}</label>
      <div className='relative'>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='h-42 w-full rounded-lg border border-gray-30 px-4 py-2 focus:border-violet-20 focus:outline-none tablet:h-48'
        />
      </div>
    </div>
  );
};

interface FormButtonProps {
  children: ReactNode;
  icon?: string;
}

const FormButton = ({ children, icon }: FormButtonProps) => {
  return (
    <div className='flex justify-end'>
      <button
        type='submit'
        className={
          icon
            ? "flex h-28 w-86 items-center justify-center gap-1.5 rounded bg-violet-20 text-xs font-medium text-white tablet:h-32 tablet:w-105 tablet:gap-2 tablet:text-sm"
            : "h-28 w-84 rounded bg-violet-20 text-xs font-medium text-white tablet:h-32 tablet:text-sm"
        }
      >
        {icon && <img src={icon} alt='버튼 아이콘' className='h-14 w-14' />}
        {children}
      </button>
    </div>
  );
};

DashBoardForm.Field = FormField;
DashBoardForm.Button = FormButton;

export default DashBoardForm;

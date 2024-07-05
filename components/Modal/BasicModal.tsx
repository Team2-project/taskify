import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import Form from "../Form/FormField/FormField";

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  buttonAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cancelButtonText: string;
  createButtonText: string;
  title: string;
  subTitle: string;
  placeholder: string;
  error?: string;
  showError?: boolean;
  leftCornerContent?: React.ReactNode;
}

export default function BasicModal({
  isOpen,
  value,
  onClose,
  onSubmit,
  onChange,
  buttonAction,
  title,
  subTitle,
  placeholder,
  cancelButtonText,
  createButtonText,
  error = "",
  showError = false,
  leftCornerContent,
}: ModalProps) {
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(value.trim() === "");
  }, [value]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonAction) {
      buttonAction(e);
    }
    onClose();
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-10 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-241 w-327 rounded-[8px] bg-white px-[20px] py-[28px] tablet:h-276 tablet:w-540 tablet:py-[32px]'>
        <div className='mb-[16px] text-[20px] font-bold tablet:mb-[22px]'>
          {title}
        </div>
        <Form onSubmit={onSubmit}>
          <Form.Field
            label={subTitle}
            type='text'
            name={subTitle}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            width='w-287'
            tabletWidth='tablet:w-498'
            desktopWidth='desktop:w-498'
            error={error}
            showError={showError}
          />
        </Form>
        {leftCornerContent && (
          <div className='absolute bottom-14 left-8 transform'>
            {leftCornerContent}
          </div>
        )}
        <div className='mt-[10px] flex items-center gap-[11px] tablet:justify-end'>
          <Button
            onClick={handleCloseClick}
            className='h-[42px] w-[138px] rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50 tablet:h-48 tablet:w-120'
          >
            {cancelButtonText}
          </Button>
          <Button
            onClick={handleButtonClick}
            className={`h-[42px] w-[138px] rounded-[8px] text-white tablet:h-48 tablet:w-120 ${
              isButtonDisabled ? "bg-gray-40" : "bg-violet-20"
            }`}
            disabled={isButtonDisabled}
          >
            {createButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

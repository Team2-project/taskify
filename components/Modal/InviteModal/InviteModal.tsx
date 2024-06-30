import { MouseEventHandler, useState } from "react";
import Button from "@/components/Button";

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  buttonAction?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  cancelButtonText: string;
  createButtonText: string;
  title: string;
  subTitle: string;
  placeholder: string;
}

export default function BasicModal({
  isOpen,
  value,
  onClose,
  buttonAction,
  onSubmit,
  title,
  subTitle,
  placeholder,
  cancelButtonText,
  createButtonText,
}: ModalProps) {
  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    }
    onClose();
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[276px] w-[540px] rounded-[8px] bg-white px-[28px] pb-[28px] pt-[32px]'>
        <div className='text-[20px] font-bold'>{title}</div>
        <form
          onSubmit={onSubmit}
          className='mb-[28px] mt-[32px] flex flex-col gap-[10px]'
        >
          <label className='text-[18px] font-medium'>{subTitle}</label>
          <input
            type='text'
            name='boardname'
            value={value}
            className='h-[42px] rounded-[6px] border-[1px] border-gray-30 p-[15px] text-[16px] font-normal'
            placeholder={placeholder}
          />
          <div className='flex items-center justify-center gap-[11px] py-[24px]'>
            <Button
              onClick={handleButtonClick}
              className='h-[42px] w-[138px] rounded-[8px] text-white'
            >
              {createButtonText}
            </Button>
            <Button
              onClick={handleCloseClick}
              className='h-[42px] w-[138px] rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
            >
              {cancelButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


import React from "react";
import { useRouter } from "next/router";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonText: string;
  buttonAction?: () => void;
}

const BasicModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  buttonText,
  buttonAction,
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='h-200 w-327 rounded-lg bg-white p-6 tablet:h-250 tablet:w-540'>
        <h1 className='mt-10 justify-center text-center text-base font-medium text-black-20 tablet:mt-16 tablet:text-lg'>
          {message}
        </h1>
        <div className='mt-10 flex justify-center tablet:mt-16 tablet:justify-end'>
          <button
            onClick={handleButtonClick}
            className='h-42 w-138 rounded-lg bg-violet-20 px-9 py-2 text-sm font-medium text-white tablet:h-48 tablet:w-120 tablet:text-base'
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicModal;

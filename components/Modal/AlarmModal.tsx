import React from "react";

interface ModalProps {
  isOpen: boolean;
  message: string;
  buttonText: string;
  onClose: () => void;
  buttonAction?: (memberId?: number) => void;
}

const AlarmModal: React.FC<ModalProps> = ({
  isOpen,
  message,
  buttonText,
  onClose,
  buttonAction,
}) => {
  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    }
    onClose();
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleBackgroundClick}
    >
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

export default AlarmModal;


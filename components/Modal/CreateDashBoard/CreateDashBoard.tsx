import { useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form/FormField/FormField";

interface ModalProps {
  title: string;
  value: string;
  isOpen: boolean;
  subTitle: string;
  placeholder: string;
  createButtonText: string;
  cancelButtonText: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, color: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonAction?: () => void;
}
export default function CreateDashBoard({
  title,
  value,
  isOpen,
  subTitle,
  placeholder,
  createButtonText,
  cancelButtonText,
  onClose,
  onSubmit,
  buttonAction,
  onChange,
}: ModalProps) {
  const [selectedCircle, setSelectedCircle] = useState<string>('');

  const colors = ["green", "purple", "orange", "blue", "pink"];

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

  const handleCircleClick = (color: string) => {
    setSelectedCircle(color);
  };

  return (
    <div className='fixed inset-0 z-100 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[293px] w-[327px] rounded-[8px] bg-white px-[20px] py-[28px] tablet:h-[334px] tablet:w-[540px]'>
        <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px]'>
          {title}
        </div>
        <Form onSubmit={(e) => onSubmit(e, selectedCircle)}>
          <Form.Field
            label={subTitle}
            type='text'
            name={subTitle}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            width='w-full'
            tabletWidth='tablet-w-full'
            desktopWidth='desktop-w-full'
          />
        <div className='mt-[24px] flex justify-around tablet:mt-[28px] tablet:justify-around'>
          {colors.map((color) => (
            <div
              key={color}
              onClick={() => handleCircleClick(color)}
              className='relative flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full'
            >
              <img
                src={`/chip/${color}.svg`}
                alt={color}
                className='h-full w-full rounded-full'
              />
              {color === selectedCircle && (
                <img
                  src='/chip/check.svg'
                  alt='check'
                  className='absolute h-[24px] w-[24px]'
                />
              )}
            </div>
          ))}
        </div>
        <div className='flex items-center justify-center gap-[11px] py-[20px] tablet:py-[24px]'>
          <Button
            onClick={handleButtonClick}
            type='submit'
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
        </Form>
      </div>
    </div>
  );
}

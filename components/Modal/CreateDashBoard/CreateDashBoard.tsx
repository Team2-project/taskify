import { useState } from "react";
import Button from "@/components/Button";

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  buttonAction?: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function CreateDashBoard({
  isOpen,
  onClose,
  buttonAction,
  value,
  onSubmit,
}: ModalProps) {
  const [selectedCircle, setSelectedCircle] = useState<string | null>(null);

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
    <div className='fixed inset-0 box-border h-full w-full bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[293px] w-[327px] rounded-[8px] bg-white px-[20px] py-[28px] tablet:h-[334px] tablet:w-[540px]'>
        <div className='text-[20px] font-bold'>새로운 대시보드</div>
        <form
          onSubmit={onSubmit}
          className='my-[24px] flex flex-col gap-[10px] tablet:mb-[28px] tablet:mt-[32px]'
        >
          <label className='text-[16px] font-medium'>대시보드 이름</label>
          <input
            type='text'
            name='boardname'
            value={value}
            className='h-[42px] rounded-[6px] border-[1px] border-gray-30'
          />
          <div className='flex justify-around gap-[10px] tablet:justify-around'>
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
          <div className='flex items-center justify-center gap-[11px] py-[24px] tablet:py-[28px]'>
            <Button
              onClick={handleButtonClick}
              className='h-[42px] w-[138px] rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
            >
              취소
            </Button>
            <Button
              onClick={handleCloseClick}
              className='h-[42px] w-[138px] rounded-[8px] text-white'
            >
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


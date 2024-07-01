import { useState } from "react";
import Calendar from "@/components/Input/Calendar";
import DropDown from "@/components/Input/DropDown";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import TagInput from "@/components/Input/TagInput";
import ImgInput from "@/components/Input/ImgInput";
import Button from "@/components/Button";

interface CardAddProps {
  isOpen: boolean;
  onClose: () => void;
  buttonAction?: () => void;
  createButtonText: string;
  cancelButtonText: string;
}

export default function CardAddModal({
  isOpen,
  buttonAction,
  onClose,
  createButtonText,
  cancelButtonText,
}: CardAddProps) {
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

  const getStringDate = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[766px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <h1 className='text-[20px] font-bold tablet:text-[24px]'>할 일 생성</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <DropDown subTitle='담당자' placeholder='이름을 입력해 주세요' />
          <Input subTitle='제목' placeholder='제목을 입력해 주세요' />
          <Textarea subTitle='설명' placeholder='설명을 입력해 주세요' />
          <Calendar
            subTitle='마감일'
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <TagInput subTitle='태그' placeholder='입력 후 Enter' />
          <ImgInput subTitle='이미지' />
          <div className='mt-[18px] flex w-full items-center justify-center gap-[11px] tablet:mt-[26px] tablet:justify-end'>
            <Button
              onClick={handleButtonClick}
              className='h-[50px] w-full rounded-[8px] text-white'
            >
              {createButtonText}
            </Button>
            <Button
              onClick={handleCloseClick}
              className='h-[50px] w-full rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
            >
              {cancelButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


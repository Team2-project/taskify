import { FC, useEffect } from "react";
import DropDown from "@/components/Input/DropDown";
import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import Calendar from "@/components/Input/Calendar";
import TagInput from "@/components/Input/TagInput";
import ImgInput from "@/components/Input/ImgInput";
import Button from "@/components/Button";
import useModal from "@/hooks/useModal";

interface ModalProps {
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonAction: () => void;
  onClose: () => void;
  createButtonText: string;
  cancelButtonText: string;
}

export default function CardEditModal({
  isOpen,
  onSubmit,
  onClose,
  buttonAction,
  createButtonText,
  cancelButtonText,
}: ModalProps) {
  const { isOpen: modalIsOpen, openModal, closeModal } = useModal(isOpen);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  const handleButtonClick = () => {
    if (buttonAction) {
      buttonAction();
    }
    onClose();
  };

  const handleCloseClick = () => {
    onClose();
  };

  if (!modalIsOpen) return null;

  return (
    <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[869px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <div className='text-[20px] font-bold tablet:text-[24px]'>
          할 일 수정
        </div>
        <div className='tablet:flex tablet:items-center tablet:justify-center tablet:gap-[16px]'>
          <DropDown subTitle='상태' />
          <DropDown subTitle='담당자' />
        </div>
        <Input subTitle='제목' />
        <Textarea subTitle='설명' />
        <Calendar subTitle='마감일' />
        <TagInput subTitle='태그' />
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
      </div>
    </div>
  );
}

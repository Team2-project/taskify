import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateCardData } from "@/lib/api/types/cards";

import fetcher from "@/lib/api/fetcher";
import Button from "@/components/Button";
import Input from "@/components/Input/Input";
import Calendar from "@/components/Input/Calendar";
import DropDown from "@/components/Input/DropDown";
import Textarea from "@/components/Input/Textarea";
import TagInput from "@/components/Input/TagInput";
import ImgInput from "@/components/Input/ImgInput";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface CardAddProps {
  isOpen: boolean;
  columnId: number;
  onClose: () => void;
  buttonAction?: () => void;
  createButtonText: string;
  cancelButtonText: string;
}

export default function CardAddModal({
  isOpen,
  columnId,
  onClose,
  buttonAction,
  createButtonText,
  cancelButtonText,
}: CardAddProps) {
  const [dropData, setDropData] = useState<string>("");
  const [assigneeUserId, setAssigneeUserId] = useState<number | null>(null);
  const [inputData, setInputData] = useState<string>("");
  const [textData, setTextData] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [tagData, setTagData] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<File | null>(null);

  const router = useRouter();
  const { dashboardId } = router.query;

  const queryClient = useQueryClient();

  const uploadCardImg = async (
    columnId: number,
    data: File,
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("image", data);

    const response = await fetcher<{ imageUrl: string }>({
      url: `columns/${columnId}/card-image`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.imageUrl;
  };

  const createCard = async (cardData: CreateCardData): Promise<void> => {
    await fetcher<void>({
      url: "/cards",
      method: "POST",
      data: cardData,
    });
  };

  const mutation = useMutation<void, AxiosError, CreateCardData>({
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
    },
    onError: (error) => {
      if (error.response) {
        throw error;
      }
    },
  });

  const handleDropClick = (userId: number, nickname: string) => {
    setDropData(nickname);
    setAssigneeUserId(userId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextData(e.target.value);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD HH:MM");
      setStartDate(formattedDate);
    } else {
      setStartDate("");
    }
  };

  const handleTagChange = (newTags: string[]) => {
    setTagData(newTags);
  };

  const handleImgChange = (file: File | null) => {
    setImgFile(file);
  };

  const handleButtonClick = async () => {
    let imgData: string= "";
    if (imgFile) {
      try {
        imgData = await uploadCardImg(columnId, imgFile);
      } catch (error) {
        throw error;
      }
    }

    const cardData: CreateCardData = {
      assigneeUserId: assigneeUserId || 0,
      dashboardId: Number(dashboardId),
      columnId,
      title: inputData,
      description: textData,
      dueDate: startDate || "",
      tags: tagData,
      ...(imgData ? { imageUrl: imgData } : {}),
    };

    mutation.mutate(cardData);

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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative max-h-[760px] w-[90vw] max-w-[327px] overflow-y-auto rounded-[8px] bg-white p-[20px] tablet:max-h-[760px] tablet:w-[70vw] tablet:max-w-[506px] tablet:p-[28px] desktop:max-h-[760px] desktop:w-[50vw] desktop:max-w-[506px]'>
        <h1 className='text-[20px] font-bold tablet:text-[24px]'>할 일 생성</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <DropDown
            dropData={dropData}
            handleDropClick={handleDropClick}
            subTitle='담당자'
            placeholder='이름을 입력해 주세요'
          />
          <Input
            subTitle='제목'
            placeholder='제목을 입력해 주세요'
            handleInputChange={handleInputChange}
            inputData={inputData}
          />
          <Textarea
            subTitle='설명'
            placeholder='설명을 입력해 주세요'
            handleTextChange={handleTextChange}
            textData={textData}
          />
          <Calendar
            subTitle='마감일'
            handleDateChange={handleDateChange}
            startDate={startDate ? new Date(startDate) : null}
          />
          <TagInput
            subTitle='태그'
            placeholder='입력 후 Enter'
            handleTagChange={handleTagChange}
          />
          <ImgInput subTitle='이미지' handleImgChange={handleImgChange} />
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


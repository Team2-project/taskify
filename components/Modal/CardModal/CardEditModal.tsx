import { FC, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DropDown from "@/components/Modal/CardModal/InputCardEdit/DropDown";
import Input from "@/components/Modal/CardModal/InputCardEdit/Input";
import Textarea from "@/components/Modal/CardModal/InputCardEdit/Textarea";
import Calendar from "@/components/Modal/CardModal/InputCardEdit/Calendar";
import TagInput from "@/components/Modal/CardModal/InputCardEdit/TagInput";
import ImgInput from "@/components/Modal/CardModal/InputCardEdit/ImgInput";
import Button from "@/components/Button";
import useModal from "@/hooks/useModal";
import {
  FetchCardDetailsResponse,
  UpdateCardData,
} from "@/lib/api/types/cards";
import fetcher from "@/lib/api/fetcher";

interface ModalProps {
  isOpen: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonAction: () => void;
  onClose: () => void;
  createButtonText: string;
  cancelButtonText: string;
  cardId: number;
  columnId: number;
}

const CardEditModal: FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  buttonAction,
  createButtonText,
  cancelButtonText,
  cardId,
  columnId,
}) => {
  const queryClient = useQueryClient();
  const {
    isOpen: modalIsOpen,
    cardDetails,
    openModal,
    closeModal,
  } = useModal(isOpen, cardId);

  const [formData, setFormData] = useState<UpdateCardData>({
    columnId: 0,
    assigneeUserId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, cardId, openModal, closeModal]);

  useEffect(() => {
    if (cardDetails) {
      const dueDate = cardDetails.dueDate.replace(" ", "T");
      setFormData({
        columnId: cardDetails.columnId,
        assigneeUserId: cardDetails.assignee.id,
        title: cardDetails.title,
        description: cardDetails.description,
        dueDate: cardDetails.dueDate,
        tags: cardDetails.tags,
        imageUrl: cardDetails.imageUrl || "",
      });
    }
  }, [cardDetails]);

  const mutation = useMutation<unknown, Error, UpdateCardData>({
    mutationFn: async (updatedCard: UpdateCardData) => {
      console.log("Sending update request:", updatedCard);
      return await fetcher({
        url: `cards/${cardId}`,
        method: "PUT",
        data: updatedCard,
      });
    },
    onSuccess: () => {
      console.log("Update successful");
      queryClient.invalidateQueries({ queryKey: ["card", cardId] });
      buttonAction();
      onClose();
    },
    onError: (error) => {
      console.error("Failed to update card", error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleAssigneeChange = (assigneeUserId: number) => {
    setFormData((prev) => ({ ...prev, assigneeUserId }));
  };

  const handleColumnChange = (columnId: number) => {
    setFormData((prev) => ({ ...prev, columnId }));
  };

  const handleImageChange = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetcher<{ imageUrl: string }>({
        url: `columns/${columnId}/card-image`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prev) => ({ ...prev, imageUrl: response.imageUrl }));
    } catch (error) {
      throw new Error("Failed to upload image");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, dueDate: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (!modalIsOpen) return null;

  return (
    <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[869px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <div className='text-[20px] font-bold tablet:text-[24px]'>
          할 일 수정
        </div>
        <form onSubmit={handleSubmit}>
          <div className='tablet:flex tablet:items-center tablet:justify-center tablet:gap-[16px]'>
            <DropDown
              subTitle='상태'
              placeholder={formData.columnId.toString()}
            />
            <DropDown
              subTitle='담당자'
              placeholder={formData.assigneeUserId.toString()}
            />
          </div>
          <Input
            subTitle='제목'
            name='title'
            value={formData.title}
            onChange={handleChange}
          />
          <Textarea
            subTitle='설명'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
          <Calendar
            subTitle='마감일'
            value={formData.dueDate}
            onChange={handleDateChange}
          />
          <TagInput
            subTitle='태그'
            value={formData.tags.join(",")}
            onChange={handleTagChange}
          />
          <ImgInput subTitle='이미지' onChange={handleImageChange} />

          <div className='mt-[18px] flex w-full items-center justify-center gap-[11px] tablet:mt-[26px] tablet:justify-end'>
            <Button
              type='submit'
              className='h-[50px] w-full rounded-[8px] text-white'
            >
              {createButtonText}
            </Button>
            <Button
              onClick={onClose}
              className='h-[50px] w-full rounded-[8px] border-[1px] border-gray-30 bg-white text-gray-50'
            >
              {cancelButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEditModal;

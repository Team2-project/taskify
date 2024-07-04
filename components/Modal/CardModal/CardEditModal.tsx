import { FC, useEffect, useState } from "react";
import {
  useMutation,
  useQueryClient,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import DropDownAssignee from "@/components/Modal/CardModal/InputCardEdit/DropDownAssignee";
import DropDownColumn from "@/components/Modal/CardModal/InputCardEdit/DropDownColumn";
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
import { AxiosRequestConfig } from "axios";
import { MembersResponse } from "@/lib/api/types/members";
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
  dashboardId: number;
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
  dashboardId,
}) => {
  const queryClient = useQueryClient();
  const {
    isOpen: modalIsOpen,
    cardDetails,
    openModal,
    closeModal,
  } = useModal(isOpen, cardId);

  const [formData, setFormData] = useState<UpdateCardData>({
    columnId,
    assigneeUserId: 0,
    title: "",
    description: "",
    dueDate: "",
    tags: [],
    imageUrl: "",
  });

  const [assigneeNickname, setAssigneeNickname] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  useEffect(() => {
    if (cardDetails) {
      const dueDate = cardDetails.dueDate.replace(" ", "T");
      setFormData({
        columnId: cardDetails.columnId,
        assigneeUserId: cardDetails.assignee.id,
        title: cardDetails.title,
        description: cardDetails.description,
        dueDate: dueDate,
        tags: cardDetails.tags,
        imageUrl: cardDetails.imageUrl || "",
      });
      setAssigneeNickname(cardDetails.assignee.nickname);
    }
  }, [cardDetails]);

  const uploadCardImg = async (
    columnId: number,
    data: File,
  ): Promise<{ imageUrl: string }> => {
    try {
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
      return response;
    } catch (error: any) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

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

  const handleAssigneeChange = (
    assigneeUserId: number,
    assigneeNickname: string,
  ) => {
    setFormData((prev) => ({ ...prev, assigneeUserId }));
    setAssigneeNickname(assigneeNickname);
  };

  const handleColumnChange = (columnId: number, columnTitle: string) => {
    setFormData((prev) => ({ ...prev, columnId }));
  };

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, dueDate: value }));
  };

  const formatDate = (date: string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let imageUrl = formData.imageUrl;
      if (imageFile) {
        const response = await uploadCardImg(formData.columnId, imageFile);
        imageUrl = response.imageUrl;
      }

      const submitData: UpdateCardData = {
        ...formData,
        imageUrl,
        dueDate: formatDate(formData.dueDate), // 서버가 기대하는 형식으로 변환
      };

      console.log("Form Data before submit:", submitData); // 로그로 출력
      mutation.mutate(submitData);
    } catch (error) {
      console.error("Error uploading image or submitting form:", error);
    }
  };

  const membersConfig: AxiosRequestConfig = {
    url: `/members?dashboardId=${dashboardId}`,
    method: "GET",
  };

  const columnsConfig: AxiosRequestConfig = {
    url: `/columns?dashboardId=${dashboardId}`,
    method: "GET",
  };

  const {
    data: membersData,
    error: membersError,
    isLoading: membersLoading,
  }: UseQueryResult<MembersResponse, Error> = useQuery({
    queryKey: ["members", dashboardId],
    queryFn: async () => {
      try {
        const response = await fetcher<MembersResponse>({
          ...membersConfig,
          url: `/members?dashboardId=${dashboardId}`,
        });
        return response;
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        throw error;
      }
    },
    enabled: !!dashboardId,
  });

  const {
    data: columnsData,
    error: columnsError,
    isLoading: columnsLoading,
  }: UseQueryResult<
    { data: { id: number; title: string }[] },
    Error
  > = useQuery({
    queryKey: ["columns", dashboardId],
    queryFn: async () => {
      try {
        const response = await fetcher<{
          data: { id: number; title: string }[];
        }>({
          ...columnsConfig,
          url: `/columns?dashboardId=${dashboardId}`,
        });
        return response;
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        throw error;
      }
    },
    enabled: !!dashboardId,
  });

  if (membersError || columnsError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (membersLoading || columnsLoading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (!modalIsOpen) return null;

  return (
    <div className='fixed inset-0 box-border h-full w-full border bg-black bg-opacity-50'>
      <div className='fixed inset-0 m-auto h-[869px] w-[327px] rounded-[8px] bg-white px-[20px] pb-[20px] pt-[28px] tablet:h-[907px] tablet:w-[506px] tablet:px-[28px] tablet:pb-[28px] tablet:pt-[32px]'>
        <div className='text-[20px] font-bold tablet:text-[24px]'>
          할 일 수정
        </div>
        <form onSubmit={handleSubmit}>
          <div className='tablet:flex tablet:items-center tablet:justify-center tablet:gap-[16px]'>
            <DropDownColumn
              subTitle='상태'
              placeholder={
                columnsData?.data.find((col) => col.id === formData.columnId)
                  ?.title || "Select"
              }
              columnsData={columnsData?.data}
              onColumnSelect={handleColumnChange}
              initialColumnId={formData.columnId}
              initialColumnTitle={
                columnsData?.data.find((col) => col.id === formData.columnId)
                  ?.title || "Select"
              }
            />
            <DropDownAssignee
              subTitle='담당자'
              placeholder={
                assigneeNickname || formData.assigneeUserId.toString()
              }
              dashboardId={dashboardId}
              membersData={membersData?.members}
              onMemberSelect={(assigneeUserId, assigneeNickname) =>
                handleAssigneeChange(assigneeUserId, assigneeNickname)
              }
              initialAssigneeId={formData.assigneeUserId}
              initialAssigneeNickname={assigneeNickname}
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
          <ImgInput
            subTitle='카드 이미지'
            onChange={handleImageChange}
            initialImgUrl={formData.imageUrl} // 초기 이미지 URL 전달
          />
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

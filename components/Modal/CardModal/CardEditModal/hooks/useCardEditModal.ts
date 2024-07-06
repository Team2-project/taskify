/*
    useCardEditModal의 custom Hook
*/
import { useEffect, useState } from "react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useModal from "@/hooks/useModal";
import fetcher from "@/lib/api/fetcher";
import useCards from "@/hooks/useCards";
import {
  UpdateCardData,
  FetchCardDetailsResponse,
} from "@/lib/api/types/cards";
import { MembersResponse } from "@/lib/api/types/members";
import { AxiosRequestConfig } from "axios";

const useCardEditModal = (
  isOpen: boolean,
  cardId: number,
  dashboardId: number,
  columnId: number,
  onClose: () => void,
  buttonAction: () => void,
) => {
  const { updateCard, uploadCardImage, fetchCardDetails } = useCards();
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
        imageUrl = await uploadCardImage(formData.columnId, imageFile);
      }

      const submitData: UpdateCardData = {
        ...formData,
        imageUrl,
        dueDate: formatDate(formData.dueDate),
      };

      updateCard.mutate(
        {
          cardId,
          cardData: submitData,
        },
        {
          onSuccess: () => {
            buttonAction();
            onClose();
          },
          onError: () => {
            console.error("Failed to update card");
          },
        },
      );
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

  return {
    modalIsOpen,
    cardDetails,
    membersData,
    columnsData,
    membersLoading,
    columnsLoading,
    membersError,
    columnsError,
    formData,
    assigneeNickname,
    handleChange,
    handleTagChange,
    handleAssigneeChange,
    handleColumnChange,
    handleImageChange,
    handleDateChange,
    handleSubmit,
  };
};

export default useCardEditModal;

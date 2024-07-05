/*
CardDetailsModal을 위한 custom Hook: 모달 상태 관리, 데이터 가져오기 로직
*/
import { useQuery } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { FetchCardDetailsResponse } from "@/lib/api/types/cards";
import useModal from "@/hooks/useModal";
import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";

const useCardDetailsModal = (isOpen: boolean, cardId: number) => {
  const {
    isOpen: modalIsOpen,
    openModal,
    closeModal,
  } = useModal(isOpen, cardId);

  const {
    data: cardDetails,
    error,
    isLoading,
    refetch,
  } = useQuery<FetchCardDetailsResponse>({
    queryKey: ["cardDetails", cardId],
    queryFn: async () => {
      const config: AxiosRequestConfig = {
        url: `/cards/${cardId}`,
        method: "GET",
      };
      return fetcher<FetchCardDetailsResponse>(config);
    },
    enabled: isOpen,
  });

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen, openModal, closeModal]);

  return {
    modalIsOpen,
    isLoading,
    error,
    cardDetails,
    refetch, // refetch 함수 반환
  };
};

export default useCardDetailsModal;

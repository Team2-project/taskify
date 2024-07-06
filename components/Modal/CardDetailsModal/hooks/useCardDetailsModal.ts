/*
CardDetailsModal을 위한 custom Hook: 모달 상태 관리, 데이터 가져오기 로직
*/
import useModal from "@/hooks/useModal";
import useCards from "@/hooks/useCards";
import { useEffect } from "react";

const useCardDetailsModal = (isOpen: boolean, cardId: number) => {
  const { fetchCardDetails } = useCards();
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
  } = fetchCardDetails(cardId);

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

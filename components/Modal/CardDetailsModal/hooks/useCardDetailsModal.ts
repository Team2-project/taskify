/*
CardDetailsModal을 위한 custom Hook: 모달 상태 관리, 데이터 가져오기 로직
*/
import { useEffect } from "react";
import useModal from "@/hooks/useModal";

const useCardDetailsModal = (isOpen: boolean, cardId: number) => {
  const {
    isOpen: modalIsOpen,
    isLoading,
    error,
    cardDetails,
    openModal,
    closeModal,
  } = useModal(isOpen, cardId);

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
  };
};

export default useCardDetailsModal;

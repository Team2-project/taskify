/*
 * UseModal 훅 기능:
 * 모달창 열고(Open) & 닫기(Close), Loading 중 처리, error 처리,
 * 모달 Open시 해당 cardId로 card 정보 가져와서 fetch
 */

import { useState, useEffect, useCallback } from "react";
import fetcher from "@/lib/api/fetcher";
import { FetchCardDetailsResponse } from "@/lib/api/types/cards";

const useModal = (initialIsOpen = false, cardId?: number) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardDetails, setCardDetails] =
    useState<FetchCardDetailsResponse | null>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen && cardId !== undefined) {
      setIsLoading(true);
      setError(null);

      fetcher<FetchCardDetailsResponse>({
        url: `cards/${cardId}`,
        method: "GET",
      })
        .then((data) => setCardDetails(data))
        .catch((error) => {
          console.error("Failed to fetch card details", error);
          setError("Failed to fetch card details");
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, cardId]);

  return {
    isOpen,
    isLoading,
    error,
    cardDetails,
    openModal,
    closeModal,
  };
};

export default useModal;

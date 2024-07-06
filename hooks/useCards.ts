/*
   useCards: 카드 목록 조회, 상세 조회, 생성, 수정, 삭제 기능
*/
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import {
  CreateCardData,
  FetchCardsResponse,
  UpdateCardData,
  FetchCardDetailsResponse,
  DeleteCardData,
} from "@/lib/api/types/cards";

const useCards = () => {
  const queryClient = useQueryClient();

  // 카드 목록 조회
  const fetchCards = (columnId: number) => {
    const cardsConfig = {
      url: `/cards?size=10&columnId=${columnId}`,
      method: "GET",
    };
    return useQuery<FetchCardsResponse, Error>({
      queryKey: ["cardsData", columnId],
      queryFn: () => fetcher<FetchCardsResponse>(cardsConfig),
      enabled: !!columnId,
    });
  };

  // 카드 생성
  const createCard = (cardData: CreateCardData) => {
    const createConfig = {
      url: "/cards",
      method: "POST",
      data: cardData,
    };
    return useMutation<FetchCardDetailsResponse, Error, CreateCardData>({
      mutationKey: ["createCard"],
      mutationFn: () => fetcher<FetchCardDetailsResponse>(createConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cardsData"] });
      },
    });
  };

  // 카드 상세 조회
  const fetchCardDetails = (cardId: number) => {
    const detailConfig = {
      url: `/cards/${cardId}`,
      method: "GET",
    };
    return useQuery<FetchCardDetailsResponse, Error>({
      queryKey: ["cardDetails", cardId],
      queryFn: () => fetcher<FetchCardDetailsResponse>(detailConfig),
      enabled: !!cardId,
    });
  };

  // 카드 수정
  const updateCard = (cardId: number, cardData: UpdateCardData) => {
    const updateConfig = {
      url: `/cards/${cardId}`,
      method: "PUT",
      data: cardData,
    };
    return useMutation<FetchCardDetailsResponse, Error, UpdateCardData>({
      mutationKey: ["updateCard", cardId],
      mutationFn: () => fetcher<FetchCardDetailsResponse>(updateConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cardDetails", cardId] });
        queryClient.invalidateQueries({ queryKey: ["cardsData"] });
      },
    });
  };

  // 카드 삭제
  const deleteCard = (cardId: number) => {
    const deleteConfig = {
      url: `/cards/${cardId}`,
      method: "DELETE",
    };
    return useMutation<{ message: string }, Error, number>({
      mutationKey: ["deleteCard", cardId],
      mutationFn: () => fetcher<{ message: string }>(deleteConfig),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cardDetails", cardId] });
        queryClient.invalidateQueries({ queryKey: ["cardsData"] });
      },
    });
  };

  return {
    fetchCards,
    createCard,
    fetchCardDetails,
    updateCard,
    deleteCard,
  };
};

export default useCards;

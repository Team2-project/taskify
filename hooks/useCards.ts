/*
   useCards: 카드 목록 조회, 상세 조회, 생성, 수정, 삭제 기능 + 카드 이미지 업로드
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
import { UploadCardImageResponse } from "@/lib/api/types/columns";

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

  // 카드 생성 및 이미지 업로드
  const createCard = async (cardData: CreateCardData, file?: File) => {
    let imageUrl = "";

    // 이미지가 제공된 경우 먼저 업로드
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      const imgResponse = await fetcher<UploadCardImageResponse>({
        url: `/cards/images/upload`, // 예시 URL, 실제 API 경로에 따라 수정 필요
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      imageUrl = imgResponse.imageUrl;
    }

    // 카드 데이터에 이미지 URL 추가
    const completeCardData = {
      ...cardData,
      ...(imageUrl && { imageUrl }),
    };

    // 카드 생성 요청
    await fetcher<FetchCardDetailsResponse>({
      url: "/cards",
      method: "POST",
      data: completeCardData,
    });

    queryClient.invalidateQueries({ queryKey: ["cardsData"] });
  };

  const createCardMutation = useMutation<
    void,
    Error,
    { cardData: CreateCardData; file?: File }
  >({
    mutationFn: ({ cardData, file }) => createCard(cardData, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardsData"] });
    },
    onError: (error) => {
      console.error("Error creating card with image:", error);
      throw error;
    },
  });

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

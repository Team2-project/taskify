/*
   useCards: 카드 목록 조회, 상세 조회, 생성, 수정, 삭제 기능 + 카드 이미지 업로드
*/
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
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
    return useQuery<FetchCardsResponse, Error>({
      queryKey: ["cardsData", columnId],
      queryFn: () =>
        fetcher<FetchCardsResponse>({
          url: `/cards?size=10&columnId=${columnId}`,
          method: "GET",
        }),
      enabled: !!columnId,
    });
  };

  // 이미지 업로드
  const uploadCardImage = async (columnId: number, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetcher<UploadCardImageResponse>({
      url: `columns/${columnId}/card-image`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.imageUrl;
  };

  // 카드 생성 및 이미지 업로드 통합 로직
  const createCard = async ({
    cardData,
    file,
  }: {
    cardData: CreateCardData;
    file?: File;
  }) => {
    let imageUrl = "";
    if (file) {
      imageUrl = await uploadCardImage(cardData.columnId, file);
    }

    const completeCardData = { ...cardData, ...(imageUrl && { imageUrl }) };
    await fetcher<void>({
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
    mutationFn: createCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cardsData"] });
    },
    onError: (error) => {
      console.error("Error creating card with image:", error);
    },
  });

  // 카드 상세 조회
  const fetchCardDetails = (cardId: number) => {
    return useQuery<FetchCardDetailsResponse, Error>({
      queryKey: ["cardDetails", cardId],
      queryFn: () =>
        fetcher<FetchCardDetailsResponse>({
          url: `/cards/${cardId}`,
          method: "GET",
        }),
      enabled: !!cardId,
    });
  };

  // 카드 수정
  const updateCard = useMutation<
    FetchCardDetailsResponse,
    Error,
    { cardId: number; cardData: UpdateCardData }
  >({
    mutationFn: async ({ cardId, cardData }) => {
      return await fetcher<FetchCardDetailsResponse>({
        url: `/cards/${cardId}`,
        method: "PUT",
        data: cardData,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cardDetails", variables.cardId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cardsData", variables.cardData.columnId],
      });
    },
    onError: (error) => {
      console.error("Failed to update card", error);
    },
  });

  // 카드 삭제
  const deleteCard = useMutation<{ message: string }, Error, number>({
    mutationFn: async (cardId) => {
      return await fetcher<{ message: string }>({
        url: `/cards/${cardId}`,
        method: "DELETE",
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cardDetails", variables] });
      queryClient.invalidateQueries({ queryKey: ["cardsData"] });
    },
    onError: (error) => {
      console.error("Failed to delete card", error);
    },
  });

  return {
    fetchCards,
    createCardMutation,
    fetchCardDetails,
    updateCard,
    deleteCard,
    uploadCardImage,
  };
};

export default useCards;

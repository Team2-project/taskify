import fetcher from "@/lib/api/fetcher";
import { FetchCardsResponse } from "@/lib/api/types/cards";
import { useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

const useFetchCards = (columnId: number) => {
  const cardsConfig: AxiosRequestConfig = {
    url: `/cards?size=10&columnId=${columnId}`,
    method: "GET",
  };

  const { data, error, isLoading } = useQuery<FetchCardsResponse, Error>({
    queryKey: ["cardsData", columnId],
    queryFn: () => fetcher<FetchCardsResponse>(cardsConfig),
    enabled: !!columnId,
  });
  return { data, error, isLoading };
};

export default useFetchCards;


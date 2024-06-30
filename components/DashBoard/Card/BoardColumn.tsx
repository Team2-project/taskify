import React, { useEffect } from "react";
import Card from "./BoardCard";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { FetchCardsResponse } from "@/lib/api/types/cards";
import Button from "@/components/Button";

interface Props {
  columnId: number;
}

const BoardColumn: React.FC<Props> = ({ columnId }: Props) => {
  const handleClick = () => {
    alert("여기에 이제 할일 추가하는 모달창 연결해야 함!!!");
  };

  const cardsConfig: AxiosRequestConfig = {
    url: `/cards?size=10&columnId=${columnId}`,
    method: "GET",
  };

  const {
    data: cardsData,
    error: cardsError,
    isLoading: cardsLoading,
  }: UseQueryResult<FetchCardsResponse, Error> = useQuery({
    queryKey: ["cardsData", columnId],
    queryFn: () => fetcher<FetchCardsResponse>(cardsConfig),
    enabled: !!columnId,
  });

  useEffect(() => {
    if (cardsData && cardsData.cards) {
      console.log(`Number of Card components: ${cardsData.cards.length}`);
    }
  }, [cardsData]);

  if (!columnId || Array.isArray(columnId)) {
    return <div>유효하지 않은 컬럼 ID</div>;
  }

  return (
    <div className='flex flex-col gap-2.5 p-[17px] desktop:w-354'>
      <Button.Add onClick={handleClick} />
      {cardsLoading && <div>로딩 중...</div>}
      {cardsError && <div>데이터를 불러오는 중 오류가 발생했습니다</div>}
      {cardsData && cardsData.cards.length === 0 && (
        <div className='flex items-center justify-center p-5'>
          - 할일을 추가해주세요 -
        </div>
      )}
      {cardsData &&
        cardsData.cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
            assignee={card.assignee}
            imageUrl={card.imageUrl}
          />
        ))}
    </div>
  );
};

export default BoardColumn;

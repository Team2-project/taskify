import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "./BoardCard";
import { AxiosRequestConfig } from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { FetchCardsResponse } from "@/lib/api/types/cards";
import Button from "@/components/Button";
import Image from "next/image";
import CardDetailsModal from "@/components/Modal/CardDetailsModal";
import ChangeColumn from "@/components/DashBoard/Modal/ChangeColumn";

interface CardData {
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  assignee: {
    nickname: string;
    profileImageUrl: string | null;
  };
  imageUrl: string | null;
}

interface Props {
  columnId: number;
  title: string;
  color: string;
}

const BoardColumn: React.FC<Props> = ({ columnId, title, color }: Props) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [isChangeColumnModalOpen, setChangeColumnModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [inputValue, setInputValue] = useState("Initial value");

  const router = useRouter();
  const { dashboardId } = router.query;
  const numDashboardId = Number(dashboardId);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

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
      setTotalCount(cardsData.totalCount);
    }
  }, [cardsData]);

  if (!columnId || Array.isArray(columnId)) {
    return <div>유효하지 않은 컬럼 ID</div>;
  }

  const handleOpenCardModal = (card: CardData) => {
    setSelectedCard(card);
    setCardModalOpen(true);
  };

  const handleCloseCardModal = () => {
    setCardModalOpen(false);
    setSelectedCard(null);
  };

  // ChangeColumn 모달을 열 때 선택된 칼럼의 ID를 설정
  const handleOpenChangeColumnModal = (columnId: number) => {
    setSelectedColumnId(columnId);
    setChangeColumnModalOpen(true);
  };

  const handleCloseChangeColumnModal = () => {
    setChangeColumnModalOpen(false);
  };

  const handleOpenAddTaskModal = () => {
    setAddTaskModalOpen(true);
  };

  const handleCloseAddTaskModal = () => {
    setAddTaskModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with value:", inputValue);
    handleCloseCardModal();
  };

  return (
    <div className='min-w-[283px] border-y border-gray-20 desktop:w-354 desktop:min-w-[354px] desktop:border-x desktop:border-y-0'>
      <div className='flex h-22 items-center justify-between px-[15px] pb-[10px] pt-[25px]'>
        <div className='flex items-center gap-0.5'>
          <div
            className='mr-2 h-8 w-8 rounded-full'
            style={{ backgroundColor: color }}
          />
          <h2 className='text-base font-bold'>{title}</h2>
          <span className='ml-[12px] flex h-20 w-20 items-center justify-center rounded bg-gray-20 text-gray-50'>
            {totalCount}
          </span>
        </div>
        <button onClick={() => handleOpenChangeColumnModal(columnId)}>
          <Image
            src='/icon/ic_setting.svg'
            alt='톱니바퀴'
            width={22}
            height={22}
            className='tablet:h-24 tablet:w-24'
          />
        </button>
      </div>
      <div className='flex flex-col gap-2.5 p-[17px] desktop:w-354'>
        <Button.Add onClick={handleOpenAddTaskModal} />

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
              assignee={card.assignee.nickname}
              imageUrl={card.imageUrl}
              onClick={() => handleOpenCardModal(card)}
            />
          ))}
      </div>
      {selectedCard && (
        <CardDetailsModal
          isOpen={isCardModalOpen}
          value={inputValue}
          onClose={handleCloseCardModal}
          onSubmit={handleSubmit}
          title='Card Details'
          subTitle='Card information'
          cardId={selectedCard.id}
          dashboardId={numDashboardId}
        />
      )}
      <ChangeColumn
        isModalOpen={isChangeColumnModalOpen}
        handleCloseModal={handleCloseChangeColumnModal}
        columnId={selectedColumnId} // 선택된 칼럼의 ID를 ChangeColumn에 props로 전달
      />
    </div>
  );
};

export default BoardColumn;

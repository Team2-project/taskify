import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "./BoardCard";
import Button from "@/components/Button";
import Image from "next/image";
import CardDetailsModal from "@/components/Modal/CardDetailsModal";
import ChangeColumn from "@/components/DashBoard/Modal/ChangeColumn";
import CardAddModal from "@/components/Modal/CardModal/CardAddModal"; // CardAddModal 임포트
import { useAtom } from "jotai";
import { cardAtom } from "@/atoms/cardAtom";
import useFetchCards from "@/hooks/useFetchCard";

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
  columnId?: number;
  title?: string;
  color: string;
  refetchColumns: () => void; // 추가(진): 카드수정 후 새로고침하지 않고 update 반영하기 위해
}

const BoardColumn: React.FC<Props> = ({
  columnId,
  title,
  color,
  refetchColumns, //추가(진): 카드수정 후 새로고침하지 않고 update 반영하기 위해
}: Props) => {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isCardModalOpen, setCardModalOpen] = useState(false);
  const [isChangeColumnModalOpen, setChangeColumnModalOpen] = useState(false);
  const [isAddTaskModalOpen, setAddTaskModalOpen] = useState(false); // AddTaskModal 상태
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [inputValue, setInputValue] = useState("Initial value");

  const router = useRouter();
  const { dashboardId } = router.query;
  const numDashboardId = Number(dashboardId);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);

  const {
    data: cardsData,
    error: cardsError,
    isLoading: cardsLoading,
  } = useFetchCards(columnId || 0);
  const [, setCards] = useAtom(cardAtom);

  useEffect(() => {
    if (cardsData) {
      setCards(cardsData.cursorId);
    }
  }, [cardsData, setCards]);

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
    refetchColumns(); // 추가(진): 카드수정 후 새로고침하지 않고 update 반영하기 위해
  };

  // ChangeColumn 모달을 열 때 선택된 칼럼의 ID를 설정
  const handleOpenChangeColumnModal = (columnId: number) => {
    setCards(columnId);
    setChangeColumnModalOpen(true);
  };

  const handleCloseChangeColumnModal = () => {
    setChangeColumnModalOpen(false);
  };

  const handleOpenAddTaskModal = () => {
    setAddTaskModalOpen(true); // AddTaskModal 열기
  };

  const handleCloseAddTaskModal = () => {
    setAddTaskModalOpen(false); // AddTaskModal 닫기
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with value:", inputValue);
    handleCloseCardModal();
  };

  const handleSuccess = () => {
    if (cardsData) {
      setTotalCount(cardsData.totalCount);
    }
    refetchColumns(); // 추가
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
          columnId={columnId}
          isOpen={isCardModalOpen}
          value={inputValue}
          onClose={handleCloseCardModal}
          onSubmit={handleSubmit}
          title='Card Details'
          subTitle='Card information'
          cardId={selectedCard.id}
          dashboardId={numDashboardId}
          onSuccess={handleSuccess}
          refetchColumns={refetchColumns}
        />
      )}
      <ChangeColumn
        isModalOpen={isChangeColumnModalOpen}
        handleCloseModal={handleCloseChangeColumnModal}
        columnId={selectedColumnId} // 선택된 칼럼의 ID를 ChangeColumn에 props로 전달
      />
      <CardAddModal
        isOpen={isAddTaskModalOpen}
        onClose={handleCloseAddTaskModal}
        createButtonText='생성'
        cancelButtonText='취소'
        columnId={columnId} // columnId를 CardAddModal에 전달
      />
    </div>
  );
};

export default BoardColumn;


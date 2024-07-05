/*
  CardDetailsModal
*/

import { FC, useState } from "react";
import useCardDetailsModal from "./hooks/useCardDetailsModal";
import Header from "./components/Header";
import Body from "./components/Body";
import CardEditModal from "../CardModal/CardEditModal";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface CardDetailsModalProps extends ModalProps {
  cardId: number;
  dashboardId: number;
  columnId: number;
  onSuccess: () => void;
}

const CardDetailsModal: FC<CardDetailsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cardId,
  dashboardId,
  columnId,
  onSuccess,
}) => {
  const { modalIsOpen, isLoading, error, cardDetails, refetch } =
    useCardDetailsModal(isOpen, cardId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess();
    refetch(); // 수정: 카드 상세 데이터를 다시 가져오기
  };

  if (!modalIsOpen || !cardDetails) return null;

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    onClose(); // CardDetailsModal 닫기
    window.location.reload(); // 페이지 리로드하여 최신 데이터 반영
  };

  return (
    <div className='fixed inset-0 z-50 flex min-w-[370px] items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-[24px] max-h-screen w-full overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-lg tablet:max-h-[770px] tablet:w-[730px] desktop:max-h-[770px] desktop:w-[730px]'>
        <Header
          title={cardDetails.title}
          cardId={cardId}
          dashboardId={dashboardId}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={onClose}
        />
        <Body
          cardDetails={cardDetails}
          cardId={cardId}
          dashboardId={dashboardId}
        />
        <CardEditModal
          isOpen={isEditModalOpen}
          onSubmit={onSubmit}
          onClose={() => {
            setIsEditModalOpen(false);
            refetch(); // 추가: CardEditModal이 닫힐 때 카드 상세 데이터를 다시 가져오기
          }}
          buttonAction={handleSuccess}
          createButtonText='수정'
          cancelButtonText='취소'
          cardId={cardId}
          columnId={columnId}
          dashboardId={dashboardId}
        />
      </div>
    </div>
  );
};

export default CardDetailsModal;

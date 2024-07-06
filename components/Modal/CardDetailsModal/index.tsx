/*
  CardDetailsModal
*/

import { FC, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
  value: string;
  title: string;
  subTitle: string;
  cardId: number;
  dashboardId: number;
  columnId: number;
  onSuccess: () => void;
  refetchColumns: () => void;
}

const CardDetailsModal: FC<CardDetailsModalProps> = ({
  value,
  title,
  subTitle,
  isOpen,
  onClose,
  onSubmit,
  cardId,
  dashboardId,
  columnId,
  onSuccess,
  refetchColumns,
}) => {
  const queryClient = useQueryClient();
  const { modalIsOpen, isLoading, error, cardDetails, refetch } =
    useCardDetailsModal(isOpen, cardId);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess();
    refetch(); // 수정: 카드 상세 데이터를 다시 가져오기
    refetchColumns();
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
    <div className='fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-[24px] h-[780px] max-w-[80vw] overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-lg tablet:max-h-[750px] tablet:w-[50vw]'>
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
            handleSuccess(); // 추가: CardEditModal이 닫힐 때 성공 핸들러 호출
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


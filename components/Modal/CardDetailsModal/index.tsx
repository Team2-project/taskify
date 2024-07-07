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
  onDelete: (cardId: number) => void; // 추가된 부분
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
  onDelete, // 추가된 부분
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
    onDelete(cardId); // 추가된 부분: onDelete 함수 호출
    onClose(); // CardDetailsModal 닫기
  };

  return (
    <div className='fixed inset-0 z-50 flex min-w-[370px] items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-[24px] max-h-screen w-[350px] w-full overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-lg tablet:max-h-[600px] tablet:w-[680px] desktop:max-h-[770px] desktop:w-[680px]'>
        <Header
          title={cardDetails.title}
          cardId={cardId}
          dashboardId={dashboardId}
          onEdit={handleEdit}
          onDelete={handleDelete} // 수정된 부분
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

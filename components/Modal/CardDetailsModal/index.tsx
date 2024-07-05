// CardDetailsModal/index.tsx
import { FC, useState } from "react";
import useCardDetailsModal from "./hooks/useCardDetailsModal";
import Header from "./components/Header";
import Body from "./components/Body";
import CardEditModal from "../CardModal/CardEditModal";

interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  subTitle: string;
  cardId: number;
  dashboardId: number;
  columnId: number;
  onSuccess: () => void;
}

const CardDetailsModal: FC<ModalProps> = ({
  isOpen,
  value,
  onClose,
  onSubmit,
  title,
  subTitle,
  cardId,
  dashboardId,
  columnId,
  onSuccess,
}) => {
  const { modalIsOpen, isLoading, error, cardDetails } = useCardDetailsModal(
    isOpen,
    cardId,
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess();
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
    <div className='fixed inset-0 z-50 flex w-screen h-screen items-center justify-center bg-black bg-opacity-50'>
      <div className='mx-[24px] h-[90vh] max-w-[80vw] overflow-y-auto rounded-[8px] bg-white p-[20px] shadow-lg tablet:max-h-[770px] tablet:w-[730px] desktop:max-h-[770px] desktop:w-[730px]'>
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
          onClose={() => setIsEditModalOpen(false)}
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

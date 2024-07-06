// CardModal/CardEditModal.tsx
import { FC } from "react";
import useCardEditModal from "./hooks/useCardEditModal";
import Header from "./components/Header";
import FormContent from "./components/FormContent";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface CardEditModalProps extends ModalProps {
  buttonAction: () => void;
  createButtonText: string;
  cancelButtonText: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

const CardEditModal: FC<CardEditModalProps> = ({
  isOpen,
  onClose,
  buttonAction,
  createButtonText,
  cancelButtonText,
  cardId,
  columnId,
  dashboardId,
}) => {
  const {
    modalIsOpen,
    cardDetails,
    membersData,
    columnsData,
    membersLoading,
    columnsLoading,
    membersError,
    columnsError,
    formData,
    assigneeNickname,
    handleChange,
    handleTagChange,
    handleAssigneeChange,
    handleColumnChange,
    handleImageChange,
    handleDateChange,
    handleSubmit,
  } = useCardEditModal(
    isOpen,
    cardId,
    dashboardId,
    columnId,
    onClose,
    buttonAction,
  );

  if (membersError || columnsError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (membersLoading || columnsLoading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (!modalIsOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='relative max-h-[760px] w-[90vw] max-w-[327px] overflow-y-auto rounded-[8px] bg-white p-[20px] tablet:max-h-[760px] tablet:w-[70vw] tablet:max-w-[506px] tablet:p-[28px] desktop:max-h-[760px] desktop:w-[50vw] desktop:max-w-[506px]'>
        <Header title='할 일 수정' onClose={onClose} />
        <FormContent
          formData={formData}
          columnsData={columnsData}
          membersData={membersData}
          assigneeNickname={assigneeNickname}
          handleChange={handleChange}
          handleTagChange={handleTagChange}
          handleAssigneeChange={handleAssigneeChange}
          handleColumnChange={handleColumnChange}
          handleImageChange={handleImageChange}
          handleDateChange={handleDateChange}
          handleSubmit={handleSubmit}
          createButtonText={createButtonText}
          cancelButtonText={cancelButtonText}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default CardEditModal;

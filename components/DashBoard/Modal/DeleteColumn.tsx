import React, { useState } from "react";
import ResModal from "@/components/Modal/ResModal";
import fetcher from "@/lib/api/fetcher";

interface DeleteColumnProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  columnId: number | null;
}

const DeleteColumn: React.FC<DeleteColumnProps> = ({
  isModalOpen,
  handleCloseModal,
  columnId,
}) => {
  const handleDelete = async () => {
    if (columnId === null) {
      console.error("Invalid column ID");
      return;
    }

    try {
      await fetcher({
        url: `/columns/${columnId}`,
        method: "DELETE",
      });
      console.log("삭제 버튼 클릭됨, columnId:", columnId);
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  return (
    <div>
      <ResModal
        isOpen={isModalOpen}
        title='컬럼의 모든 카드가 삭제됩니다'
        DeleteButtonText='삭제'
        cancelButtonText='취소'
        onClose={handleCloseModal}
        buttonAction={handleDelete}
        type='col'
      />
    </div>
  );
};

export default DeleteColumn;

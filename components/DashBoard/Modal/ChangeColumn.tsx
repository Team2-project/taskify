import React, { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import DeleteColumn from "@/components/DashBoard/Modal/DeleteColumn";
import { useRouter } from "next/router";
import fetcher from "@/lib/api/fetcher";
import { CreateColumnRequest } from "@/lib/api/types/columns";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ParentComponentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  columnId: number | null;
}

const ChangeColumn: React.FC<ParentComponentProps> = ({
  isModalOpen,
  handleCloseModal,
  columnId,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false); // 삭제 모달 상태 추가
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, AxiosError, { title: string }>({
    mutationFn: async ({ title }) => {
      if (!columnId) {
        throw new Error("유효하지 않은 칼럼 ID입니다.");
      }
      await fetcher({
        url: `/columns/${columnId}`,
        method: "PUT",
        data: { title },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", dashboardId] });
      toast.success("칼럼이 성공적으로 업데이트되었습니다!");
      handleCloseModal();
    },
    onError: (error) => {
      if (error.response?.data) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        toast.error(errorMessage);
      } else {
        console.error("칼럼 업데이트 중 오류가 발생했습니다.", error);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleButtonAction = () => {
    editMutation.mutate({ title: inputValue });
  };

  // 삭제 모달 열기 핸들러 수정: 현재 모달을 닫고 삭제 모달을 엽니다
  const handleOpenDeleteModal = () => {
    handleCloseModal(); // 현재 모달 닫기
    setDeleteModalOpen(true); // 삭제 모달 열기
  };

  // 삭제 모달 닫기 핸들러 추가
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      <BasicModal
        isOpen={isModalOpen}
        value={inputValue}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        onChange={handleInputChange}
        buttonAction={handleButtonAction}
        title='컬럼 관리'
        subTitle='이름'
        placeholder='수정할 칼럼을 입력해주세요'
        cancelButtonText='취소'
        createButtonText='변경'
        error={error}
        showError={showError}
        leftCornerContent={
          <button onClick={handleOpenDeleteModal}>
            <div className='text-sm font-normal text-gray-40 underline underline-offset-1'>
              삭제하기
            </div>
          </button>
        }
      />
      <DeleteColumn
        isModalOpen={isDeleteModalOpen}
        handleCloseModal={handleCloseDeleteModal}
        columnId={columnId}
      />
    </>
  );
};

export default ChangeColumn;

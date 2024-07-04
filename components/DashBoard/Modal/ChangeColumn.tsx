import React, { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import { useRouter } from "next/router";
import fetcher from "@/lib/api/fetcher";
import { CreateColumnRequest } from "@/lib/api/types/columns";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ParentComponentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  columnId: number | null; // columnId props 추가
}

const ChangeColumn: React.FC<ParentComponentProps> = ({
  isModalOpen,
  handleCloseModal,
  columnId, // props로부터 columnId 받기
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleButtonAction = async () => {
    try {
      const formData = {
        title: inputValue,
      };

      if (!columnId) {
        console.error("유효하지 않은 칼럼 ID입니다.");
        return;
      }

      const response = await fetcher<CreateColumnRequest>({
        url: `/columns/${columnId}`,
        method: "PUT",
        data: formData,
      });

      console.log(response);
      toast.success("칼럼이 성공적으로 업데이트되었습니다!");

      setError("");
      setShowError(false);
      handleCloseModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error("칼럼 업데이트 중 오류가 발생했습니다.");
      }
    }
  };

  return (
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
        <button>
          <div className='text-sm font-normal text-gray-40 underline underline-offset-1'>
            삭제하기
          </div>
        </button>
      }
    />
  );
};

export default ChangeColumn;

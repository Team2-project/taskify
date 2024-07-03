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
  existingTitles: string[];
}

const AddColumn: React.FC<ParentComponentProps> = ({
  isModalOpen,
  handleCloseModal,
  existingTitles,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (existingTitles.includes(value)) {
      setError("중복된 컬럼 이름입니다.");
      setShowError(true);
    } else {
      setError("");
      setShowError(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleButtonAction = async () => {
    if (existingTitles.includes(inputValue)) {
      setError("중복된 컬럼 이름입니다.");
      setShowError(true);
      return;
    }
    try {
      const formData: CreateColumnRequest = {
        title: inputValue,
        dashboardId: Number(dashboardId),
      };

      const response = await fetcher<CreateColumnRequest>({
        url: `/columns`,
        method: "POST",
        data: formData,
      });

      console.log(response);
      toast.success("칼럼 생성이 완료되었습니다!");

      setError("");
      setShowError(false);
      handleCloseModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        console.log("칼럼 생성 중 오류가 발생했습니다.");
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
      title='새 칼럼 생성'
      subTitle='이름'
      placeholder='생성할 칼럼을 입력해주세요'
      cancelButtonText='취소'
      createButtonText='생성'
      error={error}
      showError={showError}
    />
  );
};

export default AddColumn;

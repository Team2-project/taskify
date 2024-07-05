import React, { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import { useRouter } from "next/router";
import fetcher from "@/lib/api/fetcher";
import { CreateColumnRequest } from "@/lib/api/types/columns";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, AxiosError, CreateColumnRequest>({
    mutationFn: async (newColumn) => {
      const response = await fetcher<unknown>({
        url: `/columns`,
        method: "POST",
        data: newColumn,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["columns", dashboardId] });
      toast.success("칼럼 생성이 완료되었습니다!");
      setInputValue(""); // 입력 필드 초기화
      setError("");
      setShowError(false);
      handleCloseModal();
    },
    onError: (error: AxiosError) => {
      if (error.response?.data) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        toast.error(errorMessage);
      } else {
        console.error("칼럼 생성 중 오류가 발생했습니다.", error);
      }
    },
  });

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleButtonAction = () => {
    if (existingTitles.includes(inputValue)) {
      setError("중복된 컬럼 이름입니다.");
      setShowError(true);
      return;
    }
    const formData: CreateColumnRequest = {
      title: inputValue,
      dashboardId: Number(dashboardId),
    };
    mutation.mutate(formData);
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

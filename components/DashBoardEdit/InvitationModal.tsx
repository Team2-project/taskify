import React, { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import { validateEmail } from "@/lib/validation";
import { useRouter } from "next/router";
import fetcher from "@/lib/api/fetcher";
import { InviteDashboardRequest } from "@/lib/api/types/dashboards";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ParentComponentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

interface ErrorResponse {
  message: string;
}

const InvitationModal: React.FC<ParentComponentProps> = ({
  isModalOpen,
  handleCloseModal,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);
  const router = useRouter();
  const { dashboardId } = router.query as { dashboardId: string };

  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 이메일 유효성 검사
    const errorMessage = validateEmail(value);
    if (errorMessage) {
      setError(errorMessage);
      setShowError(true);
    } else {
      setError("");
      setShowError(false);
    }
  };

  const mutation = useMutation({
    mutationFn: (formData: InviteDashboardRequest) =>
      fetcher<InviteDashboardRequest>({
        url: `/dashboards/${dashboardId}/invitations`,
        method: "POST",
        data: formData,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitationsData", dashboardId],
      });
      toast.success("초대 요청이 완료되었습니다!");
      handleCloseModal();
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        const responseData = error.response.data as ErrorResponse;
        toast.error(responseData.message);
      } else {
        toast.error("초대 요청 중 오류가 발생했습니다.");
      }
    },
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: InviteDashboardRequest = {
      email: inputValue,
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
      buttonAction={(e) => handleFormSubmit(e as any)}
      title='초대하기'
      subTitle='이메일'
      placeholder='이메일을 입력하세요'
      cancelButtonText='취소'
      createButtonText='초대'
      error={error}
      showError={showError}
    />
  );
};

export default InvitationModal;

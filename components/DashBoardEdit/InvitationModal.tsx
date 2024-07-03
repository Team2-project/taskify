/* 초대하기 모달창 관련 코드 */

import React, { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import { validateEmail } from "@/lib/validation";
import { useRouter } from "next/router";
import fetcher from "@/lib/api/fetcher";
import { InviteDashboardRequest } from "@/lib/api/types/dashboards";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface ParentComponentProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    //이메일 유효성 검사
    const errorMessage = validateEmail(value);
    if (errorMessage) {
      setError(errorMessage);
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
    try {
      const formData: InviteDashboardRequest = {
        email: inputValue,
      };

      // 대시보드 초대 요청
      const response = await fetcher<InviteDashboardRequest>({
        url: `/dashboards/${dashboardId}/invitations`,
        method: "POST",
        data: formData,
      });

      console.log(response);
      toast.success("초대 요청이 완료되었습니다!"); // 성공 토스트 메시지

      setError("");
      setShowError(false);
      handleCloseModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("초대 요청 중 오류가 발생했습니다.");
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

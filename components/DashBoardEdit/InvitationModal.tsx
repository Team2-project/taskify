import React, { useState } from "react";
import BasicModal from "@/components/Modal/BasicModal";
import { validateEmail } from "@/lib/validation";
import { useRouter } from "next/router";
import fetcher from "@/lib/api/fetcher";
import { InviteDashboardRequest } from "@/lib/api/types/dashboards";
import { AxiosError } from "axios"; // AxiosError 타입 임포트

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
    // 여기에 필요한 폼 제출 로직 추가
  };

  const handleButtonAction = async () => {
    try {
      const formData: InviteDashboardRequest = {
        email: inputValue,
      };

      const response = await fetcher<InviteDashboardRequest>({
        url: `/dashboards/${dashboardId}/invitations`,
        method: "POST",
        data: formData,
      });

      console.log("초대 요청이 성공적으로 전송되었습니다:", response);
      alert("초대 요청이 완료되었습니다!");

      setError("");
      setShowError(false);
      handleCloseModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        console.error(error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("초대 요청 중 오류 발생:", error);
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

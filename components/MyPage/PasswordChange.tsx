import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import fetcher from "@/lib/api/fetcher";
import PasswordForm from "./components/PasswordForm";
import PasswordModal from "./components/PasswordModal";
import { usePasswordValidation } from "./hooks/usePasswordValidation";

const PasswordChange: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [currentPasswordTouched, setCurrentPasswordTouched] =
    useState<boolean>(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState<boolean>(false);

  const {
    currentPasswordError,
    newPasswordError,
    confirmPasswordError,
    isPasswordFormValid,
  } = usePasswordValidation(currentPassword, newPassword, confirmPassword);

  const mutation = useMutation<
    void,
    AxiosError,
    { password: string; newPassword: string }
  >({
    mutationFn: async ({ password, newPassword }) => {
      await fetcher<void>({
        url: "/auth/password",
        method: "PUT",
        data: { password, newPassword },
      });
    },
    onSuccess: () => {
      setIsSuccessModalOpen(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error) => {
      if (error.response) {
        const responseData = error.response.data as { message: string };
        setErrorMessage(
          responseData.message || "비밀번호 변경에 실패했습니다.",
        );
        setIsErrorModalOpen(true);
      }
    },
  });

  const handlePasswordChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordFormValid) return;
    mutation.mutate({ password: currentPassword, newPassword });
  };

  return (
    <div className='w-[284px] rounded-[8px] border border-white bg-white px-[20px] py-[28px] tablet:w-[544px] tablet:px-[28px] tablet:py-[32px] desktop:w-[620px] desktop:px-[28px] desktop:py-[32px]'>
      <div className='mb-[24px] text-[20px] font-bold tablet:mb-[32px] tablet:text-[24px] desktop:text-[24px]'>
        비밀번호 변경
      </div>
      <PasswordForm
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmPassword={confirmPassword}
        currentPasswordError={
          currentPasswordTouched ? currentPasswordError : ""
        }
        newPasswordError={newPasswordTouched ? newPasswordError : ""}
        confirmPasswordError={
          confirmPasswordTouched ? confirmPasswordError : ""
        }
        isPasswordFormValid={isPasswordFormValid}
        onCurrentPasswordChange={(e) => {
          setCurrentPassword(e.target.value);
          setCurrentPasswordTouched(true);
        }}
        onNewPasswordChange={(e) => {
          setNewPassword(e.target.value);
          setNewPasswordTouched(true);
        }}
        onConfirmPasswordChange={(e) => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordTouched(true);
        }}
        onSubmit={handlePasswordChangeSubmit}
      />
      <PasswordModal
        isSuccessModalOpen={isSuccessModalOpen}
        isErrorModalOpen={isErrorModalOpen}
        errorMessage={errorMessage}
        onCloseSuccessModal={() => setIsSuccessModalOpen(false)}
        onCloseErrorModal={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
};

export default PasswordChange;

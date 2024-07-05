import React, { useEffect, useState } from "react";
import Form from "@/components/Form/FormField/FormField";
import Button from "@/components/Button";
import { validatePassword } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";
import fetcher from "@/lib/api/fetcher";
import { AxiosError } from "axios";
import Modal from "../Modal";

const PasswordChange: React.FC = () => {
  // useState를 사용한 입력 상태 관리
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [currentPasswordTouched, setCurrentPasswordTouched] =
    useState<boolean>(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState<boolean>(false);
  const [currentPasswordError, setCurrentPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isPasswordFormValid, setIsPasswordFormValid] =
    useState<boolean>(false);

  // 성공 모달 상태 관리
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  // 실패 모달 상태 관리
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 비밀번호 변경 Form 유효성 검사
  useEffect(() => {
    setCurrentPasswordError(validatePassword(currentPassword));
    setNewPasswordError(validatePassword(newPassword));
    setConfirmPasswordError(
      newPassword !== confirmPassword ? "새 비밀번호가 일치하지 않습니다." : "",
    );
    setIsPasswordFormValid(
      currentPassword !== "" &&
        newPassword !== "" &&
        confirmPassword !== "" &&
        !validatePassword(currentPassword) &&
        !validatePassword(newPassword) &&
        newPassword === confirmPassword,
    );
  }, [
    currentPassword,
    newPassword,
    confirmPassword,
    setCurrentPasswordError,
    setNewPasswordError,
    setConfirmPasswordError,
    setIsPasswordFormValid,
  ]);

  // 비밀번호 변경 요청을 위한 mutation 훅 설정
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
      setCurrentPasswordTouched(false);
      setNewPasswordTouched(false);
      setConfirmPasswordTouched(false);
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

  // 비밀번호 변경 Form 제출 처리 함수
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
      <Form onSubmit={handlePasswordChangeSubmit}>
        <Form.Field
          label='현재 비밀번호'
          type='password'
          name='currentPassword'
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
            setCurrentPasswordTouched(true);
          }}
          placeholder='현재 비밀번호 입력'
          error={currentPasswordError}
          showError={currentPasswordTouched && !!currentPasswordError}
          width='w-244'
          tabletWidth='tablet:w-488'
          desktopWidth='desktop:w-564'
        />
        <Form.Field
          label='새 비밀번호'
          type='password'
          name='newPassword'
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setNewPasswordTouched(true);
          }}
          placeholder='새 비밀번호 입력'
          error={newPasswordError}
          showError={newPasswordTouched && !!newPasswordError}
          width='w-244'
          tabletWidth='tablet:w-488'
          desktopWidth='desktop:w-564'
        />
        <Form.Field
          label='새 비밀번호 확인'
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordTouched(true);
          }}
          onBlur={() => {
            if (newPassword !== confirmPassword) {
              setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
            } else {
              setConfirmPasswordError("");
            }
          }}
          placeholder='새 비밀번호 다시 입력 '
          error={confirmPasswordError}
          showError={confirmPasswordTouched && !!confirmPasswordError}
          width='w-244'
          tabletWidth='tablet:w-488'
          desktopWidth='desktop:w-564'
        />
        <div className='mb-[20px] mt-[16px] flex justify-end tablet:mb-[28px] tablet:mt-[24px] desktop:mt-[24px]'>
          <Button
            type='submit'
            disabled={!isPasswordFormValid}
            className='h-[28px] w-[84px] rounded-[4px] text-[12px] text-white tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
          >
            변경
          </Button>
        </div>
      </Form>
      <Modal.Res
        isOpen={isSuccessModalOpen}
        title='비밀번호 변경 성공!'
        DeleteButtonText='확인'
        cancelButtonText=''
        onClose={() => setIsSuccessModalOpen(false)}
        buttonAction={() => setIsSuccessModalOpen(false)}
        type='mypage'
      />
      <Modal.Res
        isOpen={isErrorModalOpen}
        title={errorMessage}
        DeleteButtonText='확인'
        cancelButtonText=''
        onClose={() => setIsErrorModalOpen(false)}
        buttonAction={() => setIsErrorModalOpen(false)}
        type='mypage'
      />
    </div>
  );
};

export default PasswordChange;

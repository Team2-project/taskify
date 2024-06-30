import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import Form from "@/components/Form/FormField/FormField";
import DefaultButton from "@/components/Button";
import { validatePassword } from "@/lib/validation";

// Jotai를 사용한 상태 관리
const currentPasswordAtom = atom("");
const newPasswordAtom = atom("");
const confirmPasswordAtom = atom("");
const currentPasswordErrorAtom = atom("");
const newPasswordErrorAtom = atom("");
const confirmPasswordErrorAtom = atom("");
const isPasswordFormValidAtom = atom(false);

const PasswordChange: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useAtom(currentPasswordAtom);
  const [newPassword, setNewPassword] = useAtom(newPasswordAtom);
  const [confirmPassword, setConfirmPassword] = useAtom(confirmPasswordAtom);
  const [currentPasswordError, setCurrentPasswordError] = useAtom(
    currentPasswordErrorAtom,
  );
  const [newPasswordError, setNewPasswordError] = useAtom(newPasswordErrorAtom);
  const [confirmPasswordError, setConfirmPasswordError] = useAtom(
    confirmPasswordErrorAtom,
  );
  const [isPasswordFormValid, setIsPasswordFormValid] = useAtom(
    isPasswordFormValidAtom,
  );

  // useState를 사용한 입력 여부 상태 관리
  const [currentPasswordTouched, setCurrentPasswordTouched] =
    useState<boolean>(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState<boolean>(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] =
    useState<boolean>(false);

  // 비밀번호 변경 Form 유효성 검사
  useEffect(() => {
    setCurrentPasswordError(validatePassword(currentPassword));
    setNewPasswordError(validatePassword(newPassword));
    setConfirmPasswordError(
      newPassword !== confirmPassword ? "새 비밀번호가 일치하지 않습니다." : "",
    );
    setIsPasswordFormValid(
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

  // 비밀번호 변경 Form 제출 처리 함수
  const handlePasswordChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPasswordFormValid) return;
    console.log("비밀번호 변경:", { currentPassword, newPassword });
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
          placeholder='새 비밀번호 다시 입력 '
          error={confirmPasswordError}
          showError={confirmPasswordTouched && !!confirmPasswordError}
          width='w-244'
          tabletWidth='tablet:w-488'
          desktopWidth='desktop:w-564'
        />
        <div className='mb-[20px] mt-[16px] flex justify-end tablet:mb-[28px] tablet:mt-[24px] desktop:mt-[24px]'>
          <DefaultButton
            disabled={!isPasswordFormValid}
            className='h-[28px] w-[84px] rounded-[4px] text-[12px] text-white tablet:h-[32px] tablet:text-[14px] desktop:h-[32px] desktop:text-[14px]'
          >
            변경
          </DefaultButton>
        </div>
      </Form>
    </div>
  );
};

export default PasswordChange;

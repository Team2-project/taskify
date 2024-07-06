import React from "react";
import Form from "@/components/Form/FormField/FormField";
import Button from "@/components/Button";

interface PasswordFormProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  currentPasswordError: string;
  newPasswordError: string;
  confirmPasswordError: string;
  isPasswordFormValid: boolean;
  onCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({
  currentPassword,
  newPassword,
  confirmPassword,
  currentPasswordError,
  newPasswordError,
  confirmPasswordError,
  isPasswordFormValid,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Field
      label='현재 비밀번호'
      type='password'
      name='currentPassword'
      value={currentPassword}
      onChange={onCurrentPasswordChange}
      placeholder='현재 비밀번호 입력'
      error={currentPasswordError}
      showError={!!currentPasswordError}
      width='w-244'
      tabletWidth='tablet:w-488'
      desktopWidth='desktop:w-564'
    />
    <Form.Field
      label='새 비밀번호'
      type='password'
      name='newPassword'
      value={newPassword}
      onChange={onNewPasswordChange}
      placeholder='새 비밀번호 입력'
      error={newPasswordError}
      showError={!!newPasswordError}
      width='w-244'
      tabletWidth='tablet:w-488'
      desktopWidth='desktop:w-564'
    />
    <Form.Field
      label='새 비밀번호 확인'
      type='password'
      name='confirmPassword'
      value={confirmPassword}
      onChange={onConfirmPasswordChange}
      placeholder='새 비밀번호 다시 입력 '
      error={confirmPasswordError}
      showError={!!confirmPasswordError}
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
);

export default PasswordForm;

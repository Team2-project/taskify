import { useEffect, useState } from "react";
import { validatePassword } from "@/lib/validation";

export const usePasswordValidation = (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string,
) => {
  const [currentPasswordError, setCurrentPasswordError] = useState<string>("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [isPasswordFormValid, setIsPasswordFormValid] =
    useState<boolean>(false);

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
  }, [currentPassword, newPassword, confirmPassword]);

  return {
    currentPasswordError,
    newPasswordError,
    confirmPasswordError,
    isPasswordFormValid,
  };
};

import React from "react";
import Modal from "../../Modal";

interface PasswordModalProps {
  isSuccessModalOpen: boolean;
  isErrorModalOpen: boolean;
  errorMessage: string;
  onCloseSuccessModal: () => void;
  onCloseErrorModal: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isSuccessModalOpen,
  isErrorModalOpen,
  errorMessage,
  onCloseSuccessModal,
  onCloseErrorModal,
}) => (
  <>
    <Modal.Res
      isOpen={isSuccessModalOpen}
      title='비밀번호 변경 성공!'
      DeleteButtonText='확인'
      cancelButtonText=''
      onClose={onCloseSuccessModal}
      buttonAction={onCloseSuccessModal}
      type='mypage'
    />
    <Modal.Res
      isOpen={isErrorModalOpen}
      title={errorMessage}
      DeleteButtonText='확인'
      cancelButtonText=''
      onClose={onCloseErrorModal}
      buttonAction={onCloseErrorModal}
      type='mypage'
    />
  </>
);

export default PasswordModal;

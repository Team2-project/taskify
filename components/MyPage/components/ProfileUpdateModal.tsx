/*
    ProfileUpdate 확인용 모달
*/

import React, { FC } from "react";
import Modal from "../../Modal";

interface ModalManagerProps {
  isSuccessModalOpen: boolean;
  isErrorModalOpen: boolean;
  errorMessage: string;
  setIsSuccessModalOpen: (isOpen: boolean) => void;
  setIsErrorModalOpen: (isOpen: boolean) => void;
}

const ModalManager: FC<ModalManagerProps> = ({
  isSuccessModalOpen,
  isErrorModalOpen,
  errorMessage,
  setIsSuccessModalOpen,
  setIsErrorModalOpen,
}) => {
  return (
    <>
      <Modal.Res
        isOpen={isSuccessModalOpen}
        title='프로필 업데이트 성공!'
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
    </>
  );
};

export default ModalManager;

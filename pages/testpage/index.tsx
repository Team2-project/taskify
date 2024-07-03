/*
Modal test 페이지, 기능 완성 후 삭제 예정(JIN)
*/

import { FC, useState } from "react";
import CardDetailsModal from "@/components/Modal/CardDetailsModal";

const TestPage: FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("Initial value");

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with value:", inputValue);
    handleCloseModal();
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-10'>
      <button
        onClick={handleOpenModal}
        className='rounded bg-blue-bg px-4 py-2 text-base hover:bg-blue'
      >
        Open Modal
      </button>
      <CardDetailsModal
        isOpen={isModalOpen}
        value={inputValue}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        title='Test Modal Title'
        subTitle='This is a subtitle for the test page'
        cardId={8725} // 테스트 카드 ID
        dashboardId={9807} // 테스트 대시보드 ID
      />
    </div>
  );
};

export default TestPage;

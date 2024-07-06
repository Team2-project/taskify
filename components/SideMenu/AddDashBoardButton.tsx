import React, { useState } from "react";
import CreateDashBoardModal from "./CreateDashBoardModal"; // 새로운 모달 컴포넌트로 변경

const AddDashboardButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className='flex h-[20px] w-[276px] items-center justify-between max-desktop:w-[112px] max-tablet:w-[67px] max-tablet:justify-center'
      >
        <p className='text-[12px] max-tablet:hidden'>Dash Boards</p>
        <img
          src='/icon/ic_add_dashboard.svg'
          className='h-[20px] w-[20px]'
          alt='Dashboard'
        />
      </button>
      <CreateDashBoardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default AddDashboardButton;

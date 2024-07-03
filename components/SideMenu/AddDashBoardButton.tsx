

import useClickOutside from "@/hooks/useClickOutside";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import { useState } from "react";
import { AxiosRequestConfig } from "axios";

const AddDashboardButton = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const handleModal = () => {
    setModalOpen(true);
  };

  return (
    <button onClick={handleModal} className='flex h-[20px] w-[276px] items-center justify-between max-desktop:w-[112px] max-tablet:w-[67px] max-tablet:justify-center'>
      <p className='text-[12px] max-tablet:hidden'>Dash Boards</p>
      <img src='/icon/ic_add_dashboard.svg' className='h-[14px] w-[14px]'/>
    </button>
  );
};

//{modalOpen && <CreateDashBoard/>}
//CreateDashBoard에 필요한 props들 ===>>> isOpen={true} title={"새로운 대시보드"} value={titleValue} subTitle={"대시보드 이름"} placeholder={"새로운 대시보드 이름을 입력해주세요"} createButtonText={"생성"} cancelButtonText={"취소"} onClose={()=>setModalOpen(false)} onSubmit={postDashBoard} onChange={setTitleValue}

export default AddDashboardButton;
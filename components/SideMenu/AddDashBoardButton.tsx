import useClickOutside from "@/hooks/useClickOutside";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import { useState, ChangeEvent } from "react";

const AddDashboardButton = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [colorValue,setColorValue] = useState('')

  const handleChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  };

  const postDashboard = () => {
  };

  return (
    <>
      <button onClick={()=>setModalOpen(true)} className='flex h-[20px] w-[276px] items-center justify-between max-desktop:w-[112px] max-tablet:w-[67px] max-tablet:justify-center'>
        <p className='text-[12px] max-tablet:hidden'>Dash Boards</p>
        <img src='/icon/ic_add_dashboard.svg' className='h-[14px] w-[14px]'/>
      </button>
      <CreateDashBoard
        isOpen={modalOpen}
        title={'새로운 대시보드'}
        value={inputValue}
        subTitle={'대시보드 이름'} 
        placeholder={'대시보드 이름'} 
        createButtonText={"생성"} 
        cancelButtonText={"취소"} 
        onClose={()=>{setModalOpen(false)}} 
        onSubmit={postDashboard}
        onChange={handleChangeInput}/>
    </>
  );
};

export default AddDashboardButton;

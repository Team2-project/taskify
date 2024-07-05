import useClickOutside from "@/hooks/useClickOutside";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import { useState, ChangeEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDashboardRequest, DashboardResponse } from "@/lib/api/types/dashboards";
import fetcher from "@/lib/api/fetcher";

//colorvalue 받는 법
//

const AddDashboardButton = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue,setInputValue] = useState('')
  const [colorValue,setColorValue] = useState('')

  const queryClient = useQueryClient();

  const mutation = useMutation<DashboardResponse, Error,CreateDashboardRequest>({
    mutationFn: async (title) => {
      const response = await fetcher<DashboardResponse>({
        url: "/dashboards",
        method: "POST",
        data: title,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["titles"]
      })},
      onError: (error) => {
          console.error(error);
        }
    }
  )
  const postDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({title: inputValue, color: colorValue})
  };

  const handleChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
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

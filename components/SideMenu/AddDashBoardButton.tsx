import useClickOutside from "@/hooks/useClickOutside";
import CreateDashBoard from "@/components/Modal/CreateDashBoard/CreateDashBoard";
import { useState, ChangeEvent } from "react";
import { AxiosRequestConfig } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateDashboardRequest, DashboardResponse } from "@/lib/api/types/dashboards";
import fetcher from "@/lib/api/fetcher";
import DashBoard from "../DashBoard/DashBoard";

const AddDashboardButton = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const queryClient = useQueryClient();

  const mutation = useMutation<DashboardResponse, Error,CreateDashboardRequest>({
    mutationFn: async ({title, color}) => {
      const response = await fetcher<DashboardResponse>({
        url: "/dashboards",
        method: "POST",
        data: {title, color}
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["titles"]
      })},
      onError: (error) => {
          console.error(error)
        }
    }
  )
  const postDashboard = (e: React.FormEvent, color: string) => {
    // 자식 컴포넌트가 부모 컴포넌트한테 값을 전달해주려면
    // 함수를 통해, (함수의 parameter를 통해) 전달이 가능하다!
    e.preventDefault();
    mutation.mutate({title: inputValue, color})
  };

  const handleChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  };

  return (
    <>
      <button onClick={()=>setModalOpen(true)} className='flex h-[20px] w-[276px] items-center justify-between max-desktop:w-[112px] max-tablet:w-[67px] max-tablet:justify-center'>
        <p className='text-[12px] max-tablet:hidden'>Dash Boards</p>
        <img src='/icon/ic_add_dashboard.svg' className='h-[20px] w-[20px]'/>
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

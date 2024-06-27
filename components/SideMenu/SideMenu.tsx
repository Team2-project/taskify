//SideMenu compo

import Image from "next/image";
import Link from "next/link";

/* 해당 주석은 오류 방지를 위해 api관련 함수와 컴포넌트를 묶어둔 것입니다

import { instance } from "@/lib/api/axios";
import { json } from "stream/consumers";
import { AxiosResponse } from "axios";

interface UserData {    
  cursorId: number,
  totalCount: number,
  dashboards: [
    {
      id: number,
      title: string,
      color: string,
      createdAt: string,
      updatedAt: string,
      createdByMe: boolean,
      userId: number
    }
  ]
}

async function fetchData(): Promise<UserData> {
    const responseData = await instance.get("/6-2/dashboards");
    const jsonData = responseData.data;
    return jsonData;
};

        if( jsonData.totalCount === 0){
            return null;
        }else{
            let boardTitle: string = jsonData.dashboards[]

            const addArray = (i:number) => {

*/
    
const SideMenu = () =>{
  //로고 컴포넌트
  const LogoButton = () => {
    return(
      <button className="flex items-center w-[109px] h-[33px] fixed top-[20px] left-[24px] max-tablet:w-[67px]">
          <img src="/logo/logo_img.svg" className="w-[30px] h-auto max-tablet:w-[24px]"/>
          <img src="/logo/logo_txt.svg" className="w-[80px] h-[22px] max-tablet:hidden"/>
      </button>
    )
  }
  //버튼 리스트의 추가 버튼 컴포넌트
  const AddButton = () => {
    return(
      <button className="flex justify-between items-center w-[276px] h-[20px] max-tablet:justify-center max-desktop:w-[112px] max-tablet:w-[67px]">
        <p className="text-[12px] max-tablet:hidden">Dash Boards</p>
        <img src="/icon/ic_add_dashboard.svg" className="w-[14px] h-[14px] "/>
      </button>
    )}

//아래 컴포넌트 수정 예정
//추후 api 연동해 버튼 렌더링
  const ButtonList = () => {
    return(
      <div className="flex flex-col justify-center items-start w-full h-auto max-tablet:items-center">
        <button className="flex justify-start items-center gap-[16px] max-tablet:w-[40px] max-tablet:justify-center max-desktop:w-[112px]">
          <img src="/chip/circle.svg" className="w-[8px] h-[8px]"/>
          <p className='text-[16px] max-tablet:hidden max-desktop:text-[14px]'>임의의 제목</p>
        </button>
      </div>
      )
  }
        
  return(
    <div className='flex flex-col justify-start items-center gap-[40px] fixed top-0 left-0 border-r-[1px] border-gray-30 h-full w-[300px] max-desktop:w-[160px] max-tablet:w-[67px]'>
      <Link href="/"><LogoButton/></Link>
      <div className="flex flex-col justify-start items-center gap-[22px] fixed left-[12px] top-[110px] w-[276px] h-full max-tablet:top-[60px] max-desktop:w-[134px] max-tablet:w-[67px] max-tablet:left-0">
        <AddButton/>
        <ButtonList/>
      </div>
    </div>
  )
}

export default SideMenu;
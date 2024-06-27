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

const SideMenu = () => {
  //로고 컴포넌트
  const LogoButton = () => {
    return (
      <button className='fixed left-[24px] top-[20px] flex h-[33px] w-[109px] items-center max-tablet:w-[67px]'>
        <img
          src='/logo/logo_img.svg'
          className='h-auto w-[30px] max-tablet:w-[24px]'
        />
        <img
          src='/logo/logo_txt.svg'
          className='h-[22px] w-[80px] max-tablet:hidden'
        />
      </button>
    );
  };
  //버튼 리스트의 추가 버튼 컴포넌트
  const AddButton = () => {
    return (
      <button className='flex h-[20px] w-[276px] items-center justify-between max-desktop:w-[112px] max-tablet:w-[67px] max-tablet:justify-center'>
        <p className='text-[12px] max-tablet:hidden'>Dash Boards</p>
        <img src='/icon/ic_add_dashboard.svg' className='h-[14px] w-[14px]' />
      </button>
    );
  };

  //아래 컴포넌트 수정 예정
  //추후 api 연동해 버튼 렌더링
  const ButtonList = () => {
    return (
      <div className='flex h-auto w-full flex-col items-start justify-center max-tablet:items-center'>
        <button className='flex items-center justify-start gap-[16px] max-desktop:w-[112px] max-tablet:w-[40px] max-tablet:justify-center'>
          <img src='/chip/circle.svg' className='h-[8px] w-[8px]' />
          <p className='text-[16px] max-desktop:text-[14px] max-tablet:hidden'>
            임의의 제목
          </p>
        </button>
      </div>
    );
  };

  return (
    <div className='fixed left-0 top-0 flex h-full w-[300px] flex-col items-center justify-start gap-[40px] border-r-[1px] border-gray-30 bg-white max-desktop:w-[160px] max-tablet:w-[67px]'>
      <Link href='/'>
        <LogoButton />
      </Link>
      <div className='fixed left-[12px] top-[110px] flex h-full w-[276px] flex-col items-center justify-start gap-[22px] max-desktop:w-[134px] max-tablet:left-0 max-tablet:top-[60px] max-tablet:w-[67px]'>
        <AddButton />
        <ButtonList />
      </div>
    </div>
  );
};

export default SideMenu;

//SideMenu compo

import Image from "next/image";
import Link from "next/link";
import { instance } from "@/lib/api/axios";
import { json } from "stream/consumers";
import { AxiosResponse } from "axios";

/* 해당 주석은 오류 방지를 위해 api관련 함수와 컴포넌트를 묶어둔 것입니다

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
  const LogoButton = () => {
    return(
      <button className="w-109px h-33px fixed left-26px top-20px max-tablet:left-22">
        <div style={{ width: 23, height: 27 }}>
          <Image src="/logo/logo_img.svg" layout="fill" alt="image-logo" />
        </div>
        <div style={{ width: 80, height: 22 }} className="max-tablet:hidden">
          <Image src="/logo/logo_txt.svg" layout="fill" alt="txt-logo" />
        </div>      
      </button>
    )
  }
  //
  const ButtonList = () => {
    return(
      <div className='flex flex-col items-center'>
        <button className="flex justify-between items-center w-132px h-20px">
          <p className="text-12px max-tablet:hidden">Dash Boards</p>
          <Image src="/icon/ic_add.svg" width={14} height={14} alt="add-button"/>
        </button>
        <button>
          <img src="/chip/circle.svg" className="w-8px h-8px"/>
          <p className='text-16px max-tablet:hidden'>임의의 제목</p>
        </button>    
      </div>
      )
  }
        
  return(
    <div className='flex flex-col items-center fixed top-0 left-0 border-r-1px border-gray h-full w-300px max-desktop:w-160px max-tablet:w-67px'>
      <Link href="/"><LogoButton/></Link>
      <ButtonList/>
    </div>
  )
}

export default SideMenu;
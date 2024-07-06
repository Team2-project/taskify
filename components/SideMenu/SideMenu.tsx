//SideMenu compo
import Link from "next/link";
import ButtonList from "@/components/SideMenu/ButtonList";
import AddDashboardButton from "@/components/SideMenu/AddDashBoardButton";

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

const SideMenu = () => {   
  return (
    <div className='fixed left-0 top-0 flex h-full w-[300px] flex-col items-center justify-start gap-[40px] border-r-[1px] border-gray-30 bg-white max-desktop:w-[160px] max-tablet:w-[67px]'>
      <Link href='/mydashboard'>
        <LogoButton />
      </Link>
      <div className='fixed left-[12px] top-[110px] flex h-full w-[276px] flex-col items-center justify-start gap-[22px] max-desktop:w-[134px] max-tablet:left-0 max-tablet:top-[80px] max-tablet:w-[67px]'>
        <AddDashboardButton/>
        <ButtonList/>
      </div>
    </div>
  );
};

export default SideMenu;


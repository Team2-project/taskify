//SideMenu compo
import Link from "next/link";
import BoardTitles from "@/components/SideMenu/ButtonList";

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


  return (
    <div className='fixed left-0 top-0 flex h-full w-[300px] flex-col items-center justify-start gap-[40px] border-r-[1px] border-gray-30 bg-white max-desktop:w-[160px] max-tablet:w-[67px]'>
      <Link href='/'>
        <LogoButton />
      </Link>
      <div className='fixed left-[12px] top-[110px] flex h-full w-[276px] flex-col items-center justify-start gap-[22px] max-desktop:w-[134px] max-tablet:left-0 max-tablet:top-[60px] max-tablet:w-[67px]'>
        <AddButton />
        <BoardTitles/>
      </div>
    </div>
  );
};

export default SideMenu;


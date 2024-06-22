/* 메인 내비게이션 컴포넌트

- 랜딩 페이지에서 사용하는 내비게이션
 */
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const NavMain: FC = () => {
  return (
    <div className='flex items-center justify-between p-6'>
      {/* 로고 */}
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          <div className='flex items-center'>
            <Image src='/logo/logo_img.svg' alt='Logo' width={27} height={27} />
            {/* 모바일에서는 숨기기 */}
            <Image
              src='/logo/logo_txt.svg'
              alt='TextLogo'
              width={80}
              height={22}
              className='hidden tablet:inline desktop:inline'
            />
          </div>
        </Link>
      </div>

      {/* 네비게이션 링크 */}
      <div className='ml-auto flex items-center space-x-5 tablet:space-x-9 desktop:space-x-9'>
        <Link
          href='/login'
          className='tablet:leading-19 text-sm font-normal text-black-20 tablet:text-base desktop:text-base'
        >
          로그인
        </Link>
        <Link
          href='/signup'
          className='tablet:leading-19 text-sm font-normal text-black-20 tablet:mr-4 tablet:text-base desktop:mr-14 desktop:text-base'
        >
          회원가입
        </Link>
        <div className='hidden tablet:block tablet:w-[16px] desktop:block desktop:w-[56px]'></div>
      </div>
    </div>
  );
};

export default NavMain;

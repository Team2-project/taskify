/* 메인 내비게이션 컴포넌트

- 랜딩 페이지에서 사용하는 내비게이션
- 피그마에 bg-white, bg-black 두 가지 버전 있어서 우선 두가지 버전 다 만듦
- 일단 figma대로landing page에서는 bg-black 버전이 작동하도록 적용
 */
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/router";

const NavMain: FC = () => {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";

  return (
    <div
      className={`flex h-60 items-center justify-between p-6 tablet:h-70 desktop:h-80 ${isLandingPage ? "bg-black text-white" : "bg-white text-black-20"}`}
    >
      {/* 로고 */}
      <div className='flex items-center space-x-2'>
        <Link href='/'>
          <div className='flex items-center'>
            {isLandingPage ? (
              <Image
                src='/logo/logo_img_black.svg'
                alt='Logo'
                width={27}
                height={27}
              />
            ) : (
              <Image
                src='/logo/logo_img.svg'
                alt='Logo'
                width={27}
                height={27}
              />
            )}
            {/* 모바일에서는 숨기기 */}
            {isLandingPage ? (
              <Image
                src='/logo/logo_txt_black.svg'
                alt='TextLogo'
                width={80}
                height={22}
                className='hidden tablet:inline desktop:inline'
              />
            ) : (
              <Image
                src='/logo/logo_txt.svg'
                alt='TextLogo'
                width={80}
                height={22}
                className='hidden tablet:inline desktop:inline'
              />
            )}
          </div>
        </Link>
      </div>

      {/* 네비게이션 링크 */}
      <div className='ml-auto flex items-center space-x-5 tablet:space-x-9 desktop:space-x-9'>
        <Link
          href='/login'
          className='tablet:leading-19 text-sm font-normal tablet:text-base desktop:text-base'
        >
          로그인
        </Link>
        <Link
          href='/signup'
          className='tablet:leading-19 text-sm font-normal tablet:mr-4 tablet:text-base desktop:mr-14 desktop:text-base'
        >
          회원가입
        </Link>
        <div className='hidden tablet:block tablet:w-[16px] desktop:block desktop:w-[56px]'></div>
      </div>
    </div>
  );
};

export default NavMain;

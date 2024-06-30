import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className='tablet:mx-[40px] tablet:flex tablet:justify-between desktop:mx-[141px]'>
      <Link
        href=''
        className='mb-[12px] flex justify-center text-[12px] text-gray-40 tablet:text-[16px]'
      >
        ©codeit - 2024
      </Link>
      <div className='mx-auto mb-[68px] flex w-[117px] justify-between text-[12px] text-gray-40 tablet:mx-[0px] tablet:mb-[0px] tablet:w-[161px] tablet:text-[16px]'>
        <Link href=''>Privacy Policy</Link>
        <Link href=''>FAQ</Link>
      </div>
      <div className='mx-auto flex w-[93.27px] justify-between tablet:mx-[0px]'>
        <Link href=''>
          <Image
            className='tablet:h-[20px] tablet:w-[20px]'
            src='/icon/ic_message.svg'
            alt='email icon'
            width={18}
            height={18}
          />
        </Link>
        <Link href='https://www.facebook.com/?locale=ko_KR'>
          <Image
            className='tablet:h-[20px] tablet:w-[20px]'
            src='/icon/ic_facebook.svg'
            alt='facebook icon'
            width={18}
            height={18}
          />
        </Link>
        <Link href='https://www.instagram.com/'>
          <Image
            className='tablet:h-[20px] tablet:w-[20px]'
            src='/icon/ic_instagram.svg'
            alt='instagram icon'
            width={18}
            height={18}
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;

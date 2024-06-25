import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarTitleProps {
  title: string;
  createdByMe: boolean;
}

const NavbarTitle: FC<NavbarTitleProps> = ({
  title = "내 대시보드",
  createdByMe = false,
}) => {
  return (
    <Link href='/mydashboard'>
      <div className='flex hidden desktop:inline desktop:content-start desktop:text-xl desktop:font-bold'>
        <p className='flex desktop:ml-80'>
          {title}
          {createdByMe && (
            <Image
              src='icon/ic_crown.svg'
              alt='createdByMe'
              width={20}
              height={16}
              className='ml-2'
            />
          )}
        </p>
      </div>
    </Link>
  );
};

export default NavbarTitle;

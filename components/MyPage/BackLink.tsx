import React, { FC } from "react";
import Link from "next/link";
import ResponsiveImage from "@/components/ResponsiveImage";

interface BackLinkProps {
  href: string;
  label: string;
}

const BackLink: FC<BackLinkProps> = ({ href, label }) => {
  return (
    <Link href={href}>
      <div className='mb-[20px] flex items-center justify-start tablet:mb-[25px] desktop:mb-[25px]'>
        <div className='flex-shrink-0'>
          <ResponsiveImage
            src='/icon/ic_arrow_back.svg'
            alt='뒤로가기'
            mobile={{ width: 18, height: 18 }}
            tablet={{ width: 20, height: 20 }}
            desktop={{ width: 20, height: 20 }}
          />
        </div>
        <span className='ml-[6px] text-[14px] font-medium tablet:text-[16px] desktop:text-[16px]'>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default BackLink;

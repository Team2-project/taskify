/*
Image 컴포넌트를 반응형으로 하나하나 적용하기 귀찮아서 만들어본 ResponsiveImage 컴포넌트

사용법: 
    <ResponsiveImage
         src="/icon/ic_add_profile.png"
        alt="프로필 사진 추가"
        mobile={{ width: 20, height: 20 }}
        tablet={{ width: 30, height: 30 }}
        desktop={{ width: 40, height: 40 }}
    />
*/

import Image from "next/image";
import { FC } from "react";

interface Size {
  width: number;
  height: number;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  mobile: Size;
  tablet: Size;
  desktop: Size;
}

const ResponsiveImage: FC<ResponsiveImageProps> = ({
  src,
  alt,
  mobile,
  tablet,
  desktop,
}) => {
  return (
    <div className='relative mx-auto'>
      <div
        className='block tablet:hidden'
        style={{ width: mobile.width, height: mobile.height }}
      >
        <Image
          src={src}
          alt={alt}
          width={mobile.width}
          height={mobile.height}
          className='object-contain'
        />
      </div>
      <div
        className='hidden tablet:block desktop:hidden'
        style={{ width: tablet.width, height: tablet.height }}
      >
        <Image
          src={src}
          alt={alt}
          width={tablet.width}
          height={tablet.height}
          className='object-contain'
        />
      </div>
      <div
        className='hidden desktop:block'
        style={{ width: desktop.width, height: desktop.height }}
      >
        <Image
          src={src}
          alt={alt}
          width={desktop.width}
          height={desktop.height}
          className='object-contain'
        />
      </div>
    </div>
  );
};

export default ResponsiveImage;

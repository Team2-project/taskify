/*
이미지를 업로드하는 기능이 있는 컴포넌트
계정관리(MyPage) 와 할일생성Modal 에서 사용
*/

import React, { useRef } from "react";
import ResponsiveImage from "../../ResponsiveImage";

interface ImageUploaderProps {
  profileImage: string | ArrayBuffer | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobileWidth: string;
  tabletWidth: string;
  desktopWidth: string;
  mobileHeight: string;
  tabletHeight: string;
  desktopHeight: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  profileImage,
  onImageChange,
  mobileWidth,
  tabletWidth,
  desktopWidth,
  mobileHeight,
  tabletHeight,
  desktopHeight,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`flex cursor-pointer items-center justify-center rounded-[6px] border border-gray bg-gray ${mobileHeight} ${mobileWidth} ${tabletHeight} ${tabletWidth} ${desktopHeight} ${desktopWidth}`}
      onClick={handleImageClick}
    >
      {profileImage ? (
        <img
          src={profileImage as string}
          alt='미리보기'
          className='h-full w-full rounded-[6px] object-cover'
        />
      ) : (
        <ResponsiveImage
          src='/icon/ic_add_profile.png'
          alt='사진 추가'
          mobile={{ width: 20, height: 20 }}
          tablet={{ width: 30, height: 30 }}
          desktop={{ width: 30, height: 30 }}
        />
      )}
      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        onChange={onImageChange}
      />
    </div>
  );
};

export default ImageUploader;

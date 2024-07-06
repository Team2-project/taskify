/*
  사용자(User)의 프로필 업데이트시, 이미지를 업로드하는 기능이 있는 컴포넌트
*/

import React, { useRef } from "react";

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
        <div className='flex items-center justify-center'>
          <img
            src='/icon/ic_add_profile.png'
            alt='사진 추가'
            className='object-cover'
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        </div>
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

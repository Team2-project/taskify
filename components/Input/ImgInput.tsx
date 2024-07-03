import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface ImgInputProps {
  subTitle: string;
  value?: string;
  onChange?: (file: File) => void;
}

export default function ImgInput({ subTitle, onChange }: ImgInputProps) {
  const [imgSrc, setImgSrc] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
        if (onChange) {
          onChange(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <input
        type='file'
        accept='image/*'
        id='imageInput'
        className='hidden'
        onChange={handleImageChange}
      />
      <div className='relative flex items-center gap-[10px]'>
        {imgSrc && (
          <div className='relative h-[58px] w-[58px]'>
            <Image
              src={imgSrc}
              alt='이미지 썸네일'
              layout='fill'
              objectFit='cover'
              className='rounded-[6px]'
            />
          </div>
        )}
        <label
          htmlFor='imageInput'
          className='relative flex h-[58px] w-[58px] cursor-pointer items-center justify-center rounded-[6px] bg-gray-20'
        >
          <Image
            width={22}
            height={22}
            src='/icon/ic_add_profile.png'
            alt='이미지 추가 버튼'
          />
        </label>
      </div>
    </div>
  );
}

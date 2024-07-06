import React from "react";

interface InputProps {
  subTitle: string;
  placeholder?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputData: string;
}

export default function Input({
  subTitle,
  placeholder,
  handleInputChange,
  inputData,
}: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 엔터 키 입력을 무시하여 드롭다운이 열리고 닫히는 것을 방지
    }
  };

  return (
    <div className='mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle} <span className='text-violet-20'>{"*"}</span>
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <input
          placeholder={placeholder}
          className='w-full text-[14px] font-normal tablet:text-[16px]'
          onChange={handleInputChange}
          type='text'
          value={inputData}
          onKeyDown={handleKeyDown} // onKeyDown 이벤트 핸들러 추가
        />
      </div>
    </div>
  );
}
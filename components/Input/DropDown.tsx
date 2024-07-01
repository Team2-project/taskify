import { useState } from "react";
import { dropButton } from "../Modal/CardModal/list";

interface DropDownProps {
  subTitle: string;
  placeholder?: string;
}

export default function DropDown({ subTitle, placeholder }: DropDownProps) {
  const [dropOpen, setDropOpen] = useState<boolean>(false);

  return (
    <div className='w-full mt-[18px] flex flex-col gap-[10px] tablet:mt-[26px]'>
      <div className='text-[16px] font-medium tablet:text-[18px]'>
        {subTitle}
      </div>
      <div className='relative flex h-[42px] w-full items-center rounded-[6px] border-[1px] border-gray-30 p-4 active:border-[1px] active:border-violet-20 tablet:h-[48px]'>
        <button
          onClick={() => setDropOpen((prev) => !prev)}
          className='flex w-full items-center justify-between'
        >
          <div className='text-[14px] font-normal text-gray-40 tablet:text-[16]'>
            {placeholder}
          </div>
          {dropOpen ? dropButton.open : dropButton.close}
        </button>
      </div>
    </div>
  );
}


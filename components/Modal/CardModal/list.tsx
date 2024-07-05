import Image from "next/image";
import { ReactNode } from "react";

type ListItem = {
  listItem: ReactNode;
};

type DropButton = {
  close: ReactNode;
  open: ReactNode;
};

export const list: ListItem[] = [
  {
    listItem: (
      <div className='flex h-[20px] w-[55px] items-center justify-evenly rounded-[11px] border-[1px] border-violet-20 bg-violet-10'>
        <Image width={6} height={6} src='chip/purple.svg' alt='fasd' />
        <div className='text-[10px] font-normal text-violet-20'>To Do</div>
      </div>
    ),
  },
  {
    listItem: (
      <div className='flex h-[20px] w-[83px] items-center justify-evenly rounded-[11px] border-[1px] border-violet-20 bg-violet-10'>
        <Image width={6} height={6} src='chip/purple.svg' alt='fasd' />
        <div className='text-[10px] font-normal text-violet-20'>
          On Progress
        </div>
      </div>
    ),
  },
  {
    listItem: (
      <div className='flex h-[20px] w-[55px] items-center justify-evenly rounded-[11px] border-[1px] border-violet-20 bg-violet-10'>
        <Image width={6} height={6} src='chip/purple.svg' alt='fasd' />
        <div className='text-[10px] font-normal text-violet-20'>Done</div>
      </div>
    ),
  },
];

export const dropButton: DropButton = {
  close: (
    <Image
      width={26}
      height={26}
      src='/chip/arrow_drop_down.svg'
      alt='DropDown버튼'
    />
  ),
  open: (
    <Image
      className='rotate-180'
      width={26}
      height={26}
      src='/chip/arrow_drop_down.svg'
      alt='DropDown버튼'
    />
  ),
};

import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";

type AddButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
};

export default function AddButton({
  onClick,
  children = "",
  className = "",
}: AddButtonProps) {
  const baseClasses =
    "box-border flex w-full items-center justify-center rounded-[8px] border-[1px] border-gray-30 bg-white text-[14px] font-semibold ";

  const selectorClasses =
    "transition-all duration-500 hover:bg-violet-10 tablet:h-[68px] tablet:text-[16px] tablet:basis-1/2 desktop:h-[70px] desktop:basis-4/12";

  const childrenClasses = children
    ? "h-[58px] gap-[12px] p-[20px]"
    : "h-32 rounded-md py-[6px] tablet:h-40 tablet:py-[9px] px-auto desktop:w-314";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${selectorClasses} ${childrenClasses} ${className}`}
    >
      {children}
      <Image
        src='/icon/ic_add_card.svg'
        alt='더하기'
        width={20}
        height={20}
        className='tablet:h-22 tablet:w-22'
      />
    </button>
  );
}


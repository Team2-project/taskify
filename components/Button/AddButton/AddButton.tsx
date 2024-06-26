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
    "box-border flex h-[58px] w-full items-center justify-center gap-[12px] rounded-[8px] border-[1px] border-gray-30 bg-white p-[20px] text-[14px] font-semibold ";

  const selectorClasses =
    "transition-all duration-500 hover:bg-violet-10 tablet:h-[68px] tablet:text-[16px] tablet:basis-1/2 desktop:h-[70px] desktop:basis-4/12";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${selectorClasses} ${className}`}
    >
      {children}
      <img src='icon/ic_add_card.svg' alt='더하기' />
    </button>
  );
}


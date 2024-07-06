import { MouseEventHandler, ReactNode } from "react";
type ListButtonProps = {
  children: ReactNode;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  createdByMe: boolean;
  backgroundColor?: string; // 색상을 받아오기 위한 속성 추가
};

export default function ListButton({
  children,
  className,
  onClick,
  createdByMe,
  backgroundColor, // backgroundColor 속성 추가
}: ListButtonProps) {
  const baseClasses =
    "box-border flex h-[58px] w-full items-center justify-between rounded-[8px] border-[1px] border-gray-30 bg-white p-[20px]";

  const selectorClasses =
    "transition-all duration-500 hover:bg-violet-10 tablet:h-[68px] tablet:basis-1/2 desktop:h-[70px] desktop:basis-4/12";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${selectorClasses} ${className} ${backgroundColor}`} // 배경색을 동적으로 설정
    >
      <div className='flex max-h-[18px] justify-between gap-[12px] font-semibold tablet:max-h-[19px]'>
        <div
          className='mt-1.5 h-8 w-8 rounded-full'
          style={{ backgroundColor }}
        />{" "}
        {/* 배경색 적용 */}
        <div className='flex justify-between gap-[4px]'>
          <div className='whitespace-nowrap text-[14px] tablet:text-[16px]'>
            {children}
          </div>
          {createdByMe && (
            <img src='icon/ic_crown.svg' alt='왕관' className='w-[20px]' />
          )}
        </div>
      </div>
      <img src='icon/ic_arrow_forward.svg' alt='화살표' />
    </button>
  );
}

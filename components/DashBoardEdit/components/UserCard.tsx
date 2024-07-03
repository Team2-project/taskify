import React from "react";

interface MemberCardProps {
  title?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
  onButtonClick?: () => void;
}

const UserCard: React.FC<MemberCardProps> = ({
  title,
  buttonLabel,
  children,
  onButtonClick,
}) => {
  return (
    <div className='flex h-28 w-full items-center justify-between px-[20px] tablet:h-38'>
      <div className='flex items-center justify-center'>
        <div className='mr-2 tablet:mr-[9.5px]'>{children}</div>
        {title && (
          <h2 className='text-sm font-normal text-black-30 tablet:text-base'>
            {title}
          </h2>
        )}
      </div>

      {buttonLabel && (
        <button
          className='flex h-28 w-52 justify-center rounded border border-gray-30 bg-white py-[5px] text-center text-xs font-medium text-violet-20 tablet:h-32 tablet:w-84 tablet:py-[6px] tablet:text-sm'
          onClick={onButtonClick}
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default UserCard;

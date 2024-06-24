import React, { FC } from "react";

interface UserBadgeProps {
  nickname: string;
  bgColor: string;
}

const UserBadge: FC<UserBadgeProps> = ({ nickname, bgColor }) => {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white ${bgColor}`}
    >
      <span className='text-base font-bold text-white'>
        {nickname.slice(0, 1)}
      </span>
    </div>
  );
};

export default UserBadge;

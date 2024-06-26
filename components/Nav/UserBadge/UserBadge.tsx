import React, { FC } from "react";

interface UserBadgeProps {
  customValue?: string;
  nickname?: string;
  bgColor: string;
  textColor: string;
  size?: string;
  borderColor?: string;
  fontSize?: string;
}

const UserBadge: FC<UserBadgeProps> = ({
  customValue,
  nickname,
  bgColor = "bg-green-10",
  textColor = "text-black",
  size = "h-[38px] w-[38px]",
  borderColor = "border-white",
  fontSize = "text-base",
}) => {
  const displayValue = customValue ?? (nickname ? nickname.charAt(0) : "");

  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 ${borderColor} ${bgColor} ${size}`}
    >
      <span className={`${fontSize} font-bold ${textColor}`}>
        {displayValue}
      </span>
    </div>
  );
};

export default UserBadge;

import React, { FC } from "react";

interface UserBadgeProps {
  customValue?: string;
  nickname?: string;
  profileImageUrl?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  fontSize?: string;
  className?: string;
}

const UserBadge: FC<UserBadgeProps> = ({
  customValue,
  nickname,
  profileImageUrl,
  bgColor = "bg-green-10",
  textColor = "text-black",
  borderColor = "border-white",
  fontSize = "text-base",
  className = "",
}) => {
  const displayValue =
    customValue ?? (nickname ? nickname.charAt(0).toUpperCase() : "");

  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 ${borderColor} ${bgColor} ${className}`}
    >
      {profileImageUrl ? (
        <img
          className={`rounded-full object-cover`}
          src={profileImageUrl}
          alt='Profile'
        />
      ) : (
        <span
          className={`${fontSize} rounded-full object-cover font-bold ${textColor}`}
        >
          {displayValue}
        </span>
      )}
    </div>
  );
};

export default UserBadge;

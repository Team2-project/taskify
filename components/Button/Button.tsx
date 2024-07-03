import { MouseEventHandler, ReactNode } from "react";

type DefaultButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
};

export default function DefaultButton({
  children = "",
  disabled = false,
  className = "",
  onClick,
  active = false,
}: DefaultButtonProps) {
  const baseClasses =
    "border-box select-none rounded-[8px] text-[14px] font-medium";
  const backgroundColor = disabled
    ? "bg-gray-40"
    : active
      ? "bg-violet-20"
      : "bg-violet-20";

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${backgroundColor} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

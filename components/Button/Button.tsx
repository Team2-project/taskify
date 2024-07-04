import { MouseEventHandler, ReactNode, ButtonHTMLAttributes } from "react";

type DefaultButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  active?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export default function DefaultButton({
  children = "",
  disabled = false,
  className = "",
  onClick,
  active = false,
  type = "button",
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
      type={type}
    >
      {children}
    </button>
  );
}

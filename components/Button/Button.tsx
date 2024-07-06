import { MouseEventHandler, ReactNode, ButtonHTMLAttributes } from "react";

type DefaultButtonProps = {
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  active?: boolean;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function DefaultButton({
  type = "button",
  active = false,
  children = "",
  disabled = false,
  className = "",
  onClick,
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


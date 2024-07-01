import { MouseEventHandler, ReactNode } from "react";

type DefaultButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function DefaultButton({
  children = "",
  disabled = false,
  className = "",
  onClick,
}: DefaultButtonProps) {
  const baseClasses =
    "border-box select-none rounded-[8px] bg-violet-20 text-[14px] font-medium text-white";

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

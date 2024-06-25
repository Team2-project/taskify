import { MouseEventHandler, ReactNode } from "react";

type DefaultButtonProps = {
  size?: "md" | "lg";
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function DefaultButton({
  size,
  children = "",
  disabled = false,
  className = "",
  onClick,
}: DefaultButtonProps) {
  const baseClasses =
    "border-box select-none rounded-[8px] bg-violet-20 text-[14px] font-medium text-white";

  const sizeClasses = size
    ? {
        md: "w-content",
        lg: "w-full",
      }[size]
    : "";

  return (
    <button
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}


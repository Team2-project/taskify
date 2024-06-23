import { MouseEventHandler, ReactNode } from "react";

type DefaultButtonProps = {
  size?: "md" | "lg";
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export default function DefaultButton({
  size = "md",
  className = "",
  disabled = false,
  children,
  onClick,
}: DefaultButtonProps) {
  const baseClasses =
    "bg-violet-20 rounded-[8px] text-[14px] font-medium text-white select-none border-box";

  const sizeClasses = size === "md" ? "w-content" : "w-full";
  const buttonClasses = `${baseClasses} ${sizeClasses} ${className}`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}


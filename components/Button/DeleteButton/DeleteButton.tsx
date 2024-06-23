import { MouseEventHandler, ReactNode } from "react";

type DeleteButtonProps = {
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  size: "sm" | "md";
  className?: string;
  disabled?: boolean;
};

export default function DeleteButton({
  onDelete,
  children,
  size = "sm",
  className = "",
  disabled,
}: DeleteButtonProps) {
  const baseClasses =
    "box-border bg-gray-10 border-[1px] border-gray-30 rounded-[8px] font-medium";
  const sizeClasses = {
    sm: "w-[284px] h-[52px] text-[16px]",
    md: "w-[320px] h-[62px] text-[18px]",
  }[size];

  const buttonClasses = `${baseClasses} ${sizeClasses} ${className}`;

  return (
    <button onClick={onDelete} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
}


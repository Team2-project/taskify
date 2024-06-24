import Image from "next/image";
import { MouseEventHandler, ReactNode } from "react";

type AddButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  size: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
};

export default function AddButton({
  onClick,
  children = "",
  size = "sm",
  className = "",
  disabled = false,
}: AddButtonProps) {
  const baseClasses =
    "box-border bg-white border-[1px] border-gray-30 rounded-[8px] font-semibold flex gap-[12px] justify-center items-center";
  const sizeClasses = {
    sm: "w-full text-[14px]",
    md: "w-full text-[16px]",
    lg: "w-full text-[16px]",
  }[size];
  // 버튼에 맞는 className width, height 지정

  const imageSizes = {
    sm: { width: 20, height: 20 },
    md: { width: 22, height: 22 },
    lg: { width: 22, height: 22 },
  }[size];

  const buttonClasses = `${baseClasses} ${sizeClasses} ${className}`;

  return (
    <div>
      <button onClick={onClick} className={buttonClasses} disabled={disabled}>
        {children}
        <Image
          width={imageSizes.width}
          height={imageSizes.height}
          src='icon/ic_add_active.svg'
          alt='더하기'
        />
      </button>
    </div>
  );
}


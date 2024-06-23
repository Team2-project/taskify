import { MouseEventHandler } from "react";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size: "md" | "lg";
};

export default function ArrowButton({
  direction,
  onClick,
  disabled,
  size = "md",
}: ArrowButtonProps) {
  const baseClasses =
    "bg-white border-[1px] border-gray-30 font-medium box-border";

  const sizeClasses = size === "md" ? "w-[36px] h-[36px]" : "w-[40px] h-[40px]";
  const buttonClasses = `${baseClasses} ${sizeClasses}`;

  return (
    <button className={buttonClasses} onClick={onClick} disabled={disabled}>
      {direction === "left" ? (
        <div className='hover:font-black'>{"<"}</div>
      ) : (
        <div className='hover:font-black'>{">"}</div>
      )}
    </button>
  );
}


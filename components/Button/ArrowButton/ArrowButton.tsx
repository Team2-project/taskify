import { MouseEventHandler } from "react";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  size: "md" | "lg";
};

export default function ArrowButton({
  direction = "left",
  onClick,
  disabled = false,
  size = "md",
}: ArrowButtonProps) {
  const baseClasses =
    "box-border border-[1px] border-gray-30 bg-white font-medium";

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


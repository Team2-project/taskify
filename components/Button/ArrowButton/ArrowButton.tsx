import React, { MouseEventHandler } from "react";

type ArrowButtonProps = {
  direction: "left" | "right";
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

export default function ArrowButton({
  direction = "left",
  onClick,
  disabled = false,
}: ArrowButtonProps) {
  const baseClasses =
    "box-border h-[36px] w-[36px] border-[1px] border-gray-30 bg-white tablet:h-[40px] tablet:w-[40px]";

  const directionClasses = {
    left: "rounded-l-[4px]",
    right: "rounded-r-[4px]",
  }[direction];

  const imgClasses = "m-auto w-6/12";

  return direction === "left" ? (
    <button
      onClick={onClick}
      className={`${baseClasses} ${directionClasses}`}
      disabled={disabled}
    >
      <img className={imgClasses} src='/icon/ic_arrow_back.svg' alt='이전' />
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`${baseClasses} ${directionClasses}`}
      disabled={disabled}
    >
      <img className={imgClasses} src='/icon/ic_arrow_forward.svg' alt='다음' />
    </button>
  );
}
